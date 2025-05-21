"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceListPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceListPopup: React.FC<PriceListPopupProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 border border-amber-100/70 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#19563F] mb-6">
              {t.priceListPopup.title}
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-[#6b8362] mb-2 border-b pb-1 border-amber-200">
                  {t.priceListPopup.ridingTitle}
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{t.priceListPopup.riding_10_15_min}</li>
                  <li>{t.priceListPopup.riding_30_min}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#6b8362] mb-2 border-b pb-1 border-amber-200">
                  {t.priceListPopup.raftingTitle}
                </h3>
                <p className="text-sm italic text-gray-600 mb-1 ml-2">{t.priceListPopup.raftingIncludes}</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{t.priceListPopup.raftingAdults}</li>
                  <li>{t.priceListPopup.raftingChildren}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#6b8362] mb-2 border-b pb-1 border-amber-200">
                  {t.priceListPopup.kayakTitle}
                </h3>
                <p className="text-sm italic text-gray-600 mb-1 ml-2">{t.priceListPopup.kayakIncludes}</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{t.priceListPopup.kayakSingle}</li>
                  <li>{t.priceListPopup.kayakDual}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#6b8362] mb-2 border-b pb-1 border-amber-200">
                  {t.priceListPopup.extrasTitle}
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>{t.priceListPopup.extrasShoes}</li>
                  <li>{t.priceListPopup.extrasPhoneCase}</li>
                </ul>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full bg-[#6b8362] hover:bg-[#3E5A35] text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              'Close'
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};