import { ReactNode, useMemo, useState } from "react";
import { Toast } from "./Toasts";

export type ToastData = { content: ReactNode; onUndo: () => void };

export function useToast() {
  const [toastData, setToastData] = useState<({ key: string } & ToastData)[]>([]);

  const toasts = useMemo(
    () =>
      toastData.map(({ key, content, onUndo }) => (
        <Toast
          key={key}
          content={content}
          onClose={{ onAnimateDone: () => removeToast(key) }}
          onUndo={{ onClick: onUndo, onAnimateDone: () => removeToast(key) }}
        />
      )),
    [toastData],
  );

  function removeToast(key: string): void {
    setToastData(toastData.filter((toast) => toast.key !== key));
  }

  function addToast({ content, onUndo }: ToastData) {
    setToastData([
      ...toastData,
      { key: Math.floor(Math.random() * 36 ** 4).toString(36), content, onUndo },
    ]);
  }

  function clearToasts(): void {
    setToastData([]);
  }

  return { toasts, addToast, clearToasts };
}
