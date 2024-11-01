"use client"

import React, { useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast();
  const router = useRouter();

  useMemo(() => {
    const href = toasts[0]?.href as string
    if (href) {
      router.push(href);
    }
  }, [toasts]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, isSuccess, description,  action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <ToastTitle>{isSuccess ? "Success" : "Error"}</ToastTitle>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
