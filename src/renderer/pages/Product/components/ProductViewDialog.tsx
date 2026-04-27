// src/renderer/pages/Products/components/ProductViewDialog.tsx
import React from "react";
import { X, Loader2, TrendingUp, History, Check } from "lucide-react";
import Decimal from "decimal.js";
import { format } from "date-fns";
import { type Product } from "../../../api/core/product";
import { type InventoryMovement } from "../../../api/core/inventory";
import { type ProductSalesReportItem } from "../../../api/core/product";
import productAPI from "../../../api/core/product";

const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => {
  return active ? (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[var(--status-completed-bg)] text-[var(--status-completed)]">
      <Check className="w-3 h-3" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[var(--status-cancelled-bg)] text-[var(--status-cancelled)]">
      <X className="w-3 h-3" />
      Inactive
    </span>
  );
};

const StockBadge: React.FC<{ qty: number }> = ({ qty }) => {
  if (qty <= 0) {
    return (
      <span className="text-[var(--stock-outstock)] font-medium">
        Out of Stock
      </span>
    );
  }
  if (qty <= 5) {
    return (
      <span className="text-[var(--stock-lowstock)] font-medium">
        Low ({qty})
      </span>
    );
  }
  return <span className="text-[var(--stock-instock)] font-medium">{qty}</span>;
};

interface ProductViewDialogProps {
  product: Product | null;
  movements: InventoryMovement[];
  salesStats: ProductSalesReportItem | null;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductViewDialog: React.FC<ProductViewDialogProps> = ({
  product,
  movements,
  salesStats,
  loading,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  const getImageUrl = (image: string | null | undefined): string | null => {
    if (!image) return null;
    return productAPI.getImageUrl?.(image) || image;
  };
  const imageUrl = getImageUrl(product.image);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container with Background Image */}
        <div
          className="relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden transition-all duration-200"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para mabasa ang text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

          {/* Content - naka-relative para nasa ibabaw ng overlay */}
          <div className="relative bg-transparent p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white drop-shadow-md">
                Product Details
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/70">SKU</p>
                      <p className="text-sm font-mono text-white">
                        {product.sku}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Status</p>
                      <StatusBadge active={product.isActive} />
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-white/70">Product Name</p>
                      <p className="text-sm font-medium text-white">
                        {product.name}
                      </p>
                    </div>
                    {product.description && (
                      <div className="col-span-2">
                        <p className="text-xs text-white/70">Description</p>
                        <p className="text-sm text-white/90">
                          {product.description}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-white/70">Price</p>
                      <p className="text-lg font-bold text-[var(--accent-green)] drop-shadow-sm">
                        ₱{new Decimal(product.price).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Stock</p>
                      <StockBadge qty={product.stockQty} />
                    </div>

                    {/* Reorder Settings */}
                    <div className="col-span-2 mt-2">
                      <p className="text-xs text-white/70 border-t border-white/20 pt-2">
                        Reorder Settings
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Reorder Level</p>
                      <p className="text-sm font-medium text-white">
                        {product.reorderLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Reorder Quantity</p>
                      <p className="text-sm font-medium text-white">
                        {product.reorderQty}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-white/70">Category</p>
                      <p className="text-sm text-white">
                        {product.category?.name ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70">Created</p>
                      <p className="text-sm text-white">
                        {format(new Date(product.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sales Stats */}
                {salesStats && (
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[var(--accent-blue)]" />
                      Sales Performance
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/70">Total Sold</p>
                        <p className="text-lg font-semibold text-white">
                          {salesStats.totalQuantity} units
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">Total Revenue</p>
                        <p className="text-lg font-semibold text-[var(--accent-green)] drop-shadow-sm">
                          ₱{new Decimal(salesStats.totalRevenue).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Movements */}
                {movements.length > 0 && (
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <History className="w-4 h-4 text-[var(--accent-purple)]" />
                      Recent Inventory Movements
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scroll">
                      {movements.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between text-sm border-b border-white/10 pb-2 last:border-0"
                        >
                          <div>
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                m.qtyChange > 0
                                  ? "bg-[var(--accent-green)]"
                                  : "bg-[var(--accent-red)]"
                              }`}
                            />
                            <span className="text-white/90">
                              {m.movementType} – {m.qtyChange > 0 ? "+" : ""}
                              {m.qtyChange} units
                            </span>
                          </div>
                          <span className="text-xs text-white/60">
                            {format(new Date(m.timestamp), "MMM dd, HH:mm")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};