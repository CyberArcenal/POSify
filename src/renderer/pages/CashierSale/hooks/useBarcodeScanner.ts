import { useEffect, useRef, useCallback } from "react";

export const useBarcodeScanner = (
  onScan: (barcode: string) => void,
  enabled: boolean
) => {
  const lastScannedRef = useRef<{ barcode: string; time: number } | null>(null);
  const scanBufferRef = useRef<string>("");
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleBarcode = useCallback(
    (barcode: string) => {
      // Ignore duplicate within 500ms
      if (
        lastScannedRef.current?.barcode === barcode &&
        Date.now() - lastScannedRef.current.time < 500
      ) {
        return;
      }
      lastScannedRef.current = { barcode, time: Date.now() };
      onScan(barcode);
    },
    [onScan]
  );

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is on input/textarea/select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "Enter") {
        if (scanBufferRef.current.length > 0) {
          handleBarcode(scanBufferRef.current);
          scanBufferRef.current = "";
        }
        return;
      }

      if (e.key.length === 1) {
        scanBufferRef.current += e.key;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (scanBufferRef.current.length > 0) {
            handleBarcode(scanBufferRef.current);
            scanBufferRef.current = "";
          }
        }, 150); // shorter than 500ms but longer than typical inter-character delay
      }
    };

    // Also listen to backend events if any
    const backendHandler = (barcode: string) => handleBarcode(barcode);
    window.backendAPI?.onBarcodeScanned?.(backendHandler);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutRef.current);
      if (window.backendAPI?.offBarcodeScanned) {
        window.backendAPI.offBarcodeScanned(backendHandler);
      }
    };
  }, [enabled, handleBarcode]);
};