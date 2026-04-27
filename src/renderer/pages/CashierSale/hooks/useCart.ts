import { useReducer, useCallback } from "react";
import type { CartItem, Product } from "../types";
import { dialogs } from "../../../utils/dialogs";

type CartState = {
  cart: CartItem[];
  globalDiscount: number;
  globalTax: number;
  notes: string;
};

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_LINE_DISCOUNT"; productId: number; discountPercent: number }
  | { type: "UPDATE_LINE_TAX"; productId: number; taxPercent: number }
  | { type: "SET_GLOBAL_DISCOUNT"; value: number }
  | { type: "SET_GLOBAL_TAX"; value: number }
  | { type: "SET_NOTES"; value: string }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.product.id);
      if (existing) {
        if (existing.cartQuantity + 1 > action.product.stockQty) {
          dialogs.alert({
            title: "Insufficient Stock",
            message: `Only ${action.product.stockQty} available.`,
          });
          return state;
        }
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        };
      } else {
        if (action.product.stockQty < 1) {
          dialogs.alert({
            title: "Out of Stock",
            message: `${action.product.name} is out of stock.`,
          });
          return state;
        }
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.product,
              cartQuantity: 1,
              lineDiscount: 0,
              lineTax: 0,
            },
          ],
        };
      }
    }

    case "UPDATE_QUANTITY": {
      const item = state.cart.find((i) => i.id === action.productId);
      if (!item) return state;
      if (action.quantity > item.stockQty) {
        dialogs.alert({
          title: "Insufficient Stock",
          message: `Only ${item.stockQty} available.`,
        });
        return state;
      }
      if (action.quantity < 1) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.productId),
        };
      }
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.productId ? { ...i, cartQuantity: action.quantity } : i
        ),
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.productId),
      };

    case "UPDATE_LINE_DISCOUNT":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.productId
            ? { ...i, lineDiscount: Math.max(0, Math.min(100, action.discountPercent)) }
            : i
        ),
      };

    case "UPDATE_LINE_TAX":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.productId
            ? { ...i, lineTax: Math.max(0, Math.min(100, action.taxPercent)) }
            : i
        ),
      };

    case "SET_GLOBAL_DISCOUNT":
      return { ...state, globalDiscount: Math.max(0, Math.min(100, action.value)) };

    case "SET_GLOBAL_TAX":
      return { ...state, globalTax: Math.max(0, Math.min(100, action.value)) };

    case "SET_NOTES":
      return { ...state, notes: action.value };

    case "CLEAR_CART":
      return { cart: [], globalDiscount: 0, globalTax: 0, notes: "" };

    default:
      return state;
  }
};

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
    globalDiscount: 0,
    globalTax: 0,
    notes: "",
  });

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  }, []);

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  }, []);

  const updateLineDiscount = useCallback((productId: number, discountPercent: number) => {
    dispatch({ type: "UPDATE_LINE_DISCOUNT", productId, discountPercent });
  }, []);

  const updateLineTax = useCallback((productId: number, taxPercent: number) => {
    dispatch({ type: "UPDATE_LINE_TAX", productId, taxPercent });
  }, []);

  const setGlobalDiscount = useCallback((value: number) => {
    dispatch({ type: "SET_GLOBAL_DISCOUNT", value });
  }, []);

  const setGlobalTax = useCallback((value: number) => {
    dispatch({ type: "SET_GLOBAL_TAX", value });
  }, []);

  const setNotes = useCallback((value: string) => {
    dispatch({ type: "SET_NOTES", value });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return {
    cart: state.cart,
    globalDiscount: state.globalDiscount,
    globalTax: state.globalTax,
    notes: state.notes,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    updateLineDiscount,
    updateLineTax,
    setGlobalDiscount,
    setGlobalTax,
    setNotes,
    clearCart,
  };
};