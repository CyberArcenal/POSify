import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { dialogs } from "../../utils/dialogs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode; // Optional footer content (buttons, etc.)
  size?: "sm" | "md" | "lg" | "xl" | "full";
  minHeight?: string;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  preventScroll?: boolean;
  blur?: boolean;
  safetyClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  minHeight = "200px",
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  preventScroll = true,
  blur = false,
  safetyClose = false,
}) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Handle close with animation
  const handleClose = async () => {
    if (safetyClose &&
      !(await dialogs.confirm({
        title: "Close",
        message: "Are you sure do you want to close this dialog?.",
      }))
    )
      return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 200); // match animation duration
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && closeOnEsc) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc]);

  useEffect(() => {
    if (isOpen) {
      const previouslyFocused = document.activeElement as HTMLElement;
      const modalElement = document.getElementById("modal-container");
      modalElement?.focus();
      return () => previouslyFocused?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, preventScroll]);

  if (!isOpen && !isAnimatingOut) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop with blur and fade animation */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${
          isAnimatingOut ? "opacity-0" : "opacity-100"
        } ${blur ? "backdrop-blur-sm" : ""}`}
        onClick={closeOnClickOutside ? handleClose : undefined}
      />

      {/* Modal container with scale animation */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeClasses[size]} transform rounded-xl bg-[var(--card-bg)] shadow-2xl border border-[var(--border-color)] transition-all duration-200 ${
            isAnimatingOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
          style={{ backgroundColor: "var(--card-bg)", minHeight: minHeight }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
              {title && (
                <h3
                  id="modal-title"
                  className="text-lg font-semibold text-[var(--sidebar-text)]"
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="rounded-md p-1.5 hover:bg-[var(--card-secondary-bg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
                  aria-label="Close modal"
                >
                  <X
                    className="h-5 w-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4 text-[var(--sidebar-text)]">{children}</div>

          {/* Footer (if provided) */}
          {footer && (
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--border-color)] bg-[var(--card-secondary-bg)] rounded-b-xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
