"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ModalDialog } from "@/app/helpers/ModalDialog";

interface DialogContextType {
  openDialog: (title: string, message: string, confirmLabel?: string, onConfirm?: () => void) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmLabel, setConfirmLabel] = useState<string | undefined>(undefined);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);

  const openDialog = useCallback((title: string, message: string, confirmLabel?: string, onConfirm?: () => void) => {
    setTitle(title);
    setMessage(message);
    setConfirmLabel(confirmLabel);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Delay clearing content until after exit animation (200ms matches ModalDialog leave duration)
    setTimeout(() => {
      setTitle("");
      setMessage("");
      setConfirmLabel(undefined);
      setOnConfirm(undefined);
    }, 200);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      <ModalDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        message={message}
        confirmLabel={confirmLabel}
        onConfirm={onConfirm}
      />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context.openDialog;
}
