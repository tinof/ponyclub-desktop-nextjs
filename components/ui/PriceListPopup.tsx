'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type React from 'react';

import { useLanguage } from '@/contexts/language-context';

interface PriceListPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceListPopup: React.FC<PriceListPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4
            backdrop-blur-sm
          `}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl
              border border-amber-100/70 bg-white p-6 shadow-2xl
              md:p-8
            `}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={onClose}
              className={`
                absolute top-4 right-4 rounded-full p-1 text-gray-500
                transition-colors
                hover:bg-gray-100 hover:text-gray-800
              `}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2
              className={`
                mb-6 text-center text-2xl font-bold text-[#19563F]
                md:text-3xl
              `}
            >
              {t.priceListPopup.title}
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3
                  className={`
                    mb-2 border-b border-amber-200 pb-1 text-xl font-semibold
                    text-[#6b8362]
                  `}
                >
                  {t.priceListPopup.ridingTitle}
                </h3>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  <li>{t.priceListPopup.riding_10_15_min}</li>
                  <li>{t.priceListPopup.riding_30_min}</li>
                </ul>
              </div>

              <div>
                <h3
                  className={`
                    mb-2 border-b border-amber-200 pb-1 text-xl font-semibold
                    text-[#6b8362]
                  `}
                >
                  {t.priceListPopup.raftingTitle}
                </h3>
                <p className="mb-1 ml-2 text-sm text-gray-600 italic">
                  {t.priceListPopup.raftingIncludes}
                </p>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  <li>{t.priceListPopup.raftingAdults}</li>
                  <li>{t.priceListPopup.raftingChildren}</li>
                </ul>
              </div>

              <div>
                <h3
                  className={`
                    mb-2 border-b border-amber-200 pb-1 text-xl font-semibold
                    text-[#6b8362]
                  `}
                >
                  {t.priceListPopup.kayakTitle}
                </h3>
                <p className="mb-1 ml-2 text-sm text-gray-600 italic">
                  {t.priceListPopup.kayakIncludes}
                </p>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  <li>{t.priceListPopup.kayakSingle}</li>
                  <li>{t.priceListPopup.kayakDual}</li>
                </ul>
              </div>

              <div>
                <h3
                  className={`
                    mb-2 border-b border-amber-200 pb-1 text-xl font-semibold
                    text-[#6b8362]
                  `}
                >
                  {t.priceListPopup.extrasTitle}
                </h3>
                <ul className="list-inside list-disc space-y-1 pl-2">
                  <li>{t.priceListPopup.extrasShoes}</li>
                  <li>{t.priceListPopup.extrasPhoneCase}</li>
                </ul>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`
                mt-8 w-full transform rounded-xl bg-gradient-to-r from-[#6b8362]
                to-[#19563F] px-6 py-3 font-semibold text-white shadow-lg
                transition-all duration-200
                hover:scale-[1.02] hover:from-[#5a6f54] hover:to-[#144a37]
                hover:shadow-xl
              `}
              aria-label="Close price list"
            >
              {t.priceListPopup.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
