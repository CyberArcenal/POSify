import React, { useMemo } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  // Limit initial render to first 100 items – maiiwasan ang sobrang maraming DOM elements
  const visibleProducts = useMemo(() => products.slice(0, 100), [products]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
      ))}
      {products.length > 100 && (
        <div className="col-span-full text-center text-sm text-[var(--text-tertiary)] py-4">
          Showing first 100 products. Please use search to find more.
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductGrid);