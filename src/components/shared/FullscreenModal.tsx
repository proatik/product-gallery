"use client";

import React from "react";

type FullscreenModalProps = {
  open: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

const FullscreenModal = ({
  open,
  children,
  closeModal,
}: FullscreenModalProps) => {
  const handleClose = () => {
    if (closeModal) closeModal();
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return open ? (
    <div
      onClick={handleClose}
      className="fixed inset-0 h-screen w-screen bg-black/30 z-50"
    >
      <div className="w-auto" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  ) : null;
};

export default FullscreenModal;
