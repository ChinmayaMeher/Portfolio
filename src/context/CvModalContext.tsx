"use client";

import React, { createContext, useContext, useState } from "react";
import CvModal from "@/components/CvModal";

interface CvModalContextType {
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const CvModalContext = createContext<CvModalContextType | undefined>(undefined);

export function CvModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCvModal = () => setIsOpen(true);
  const closeCvModal = () => setIsOpen(false);

  return (
    <CvModalContext.Provider
      value={{
        isCvModalOpen: isOpen,
        openCvModal,
        closeCvModal,
      }}
    >
      {children}
      <CvModal isOpen={isOpen} onClose={closeCvModal} />
    </CvModalContext.Provider>
  );
}

export function useCvModal() {
  const context = useContext(CvModalContext);
  if (!context) {
    throw new Error("useCvModal must be used within a CvModalProvider");
  }
  return context;
}
