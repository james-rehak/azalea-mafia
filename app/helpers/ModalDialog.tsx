import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm?: () => void; // Optional: separate action for the button
}

export function ModalDialog({
                              isOpen,
                              onClose,
                              title,
                              message,
                              confirmLabel = "Close",
                              onConfirm
                            }: ModalDialogProps) {

  // Handles the primary button click
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true" />
        </TransitionChild>

        {/* Centering container */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="max-w-md w-full space-y-4 rounded-xl bg-amber-50 p-8 shadow-2xl ring-1 ring-gray-200">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>

              <div className="text-sm text-gray-600">
                {message}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
                >
                  {confirmLabel}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
