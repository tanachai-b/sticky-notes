import { ReactNode, useMemo, useState } from "react";
import { Toast } from "./Toasts";

export type ToastData = { content: ReactNode; onUndo: () => void };

export function useToast() {
  const [toastData, setToastData] = useState<ToastData[]>([]);

  const toasts = useMemo(
    () =>
      toastData.map(({ content, onUndo }, index) => (
        <Toast
          key={index}
          content={content}
          onClose={() => removeToast(index)}
          onUndo={() => {
            onUndo();
            removeToast(index);
          }}
        />
      )),
    [toastData],
  );

  function removeToast(index: number): void {
    setToastData(toastData.filter((_, i) => i !== index));
  }

  function addToast({ content, onUndo }: ToastData) {
    setToastData([...toastData, { content, onUndo }]);
  }

  function clearToasts(): void {
    setToastData([]);
  }

  return { toasts, addToast, clearToasts };
}
