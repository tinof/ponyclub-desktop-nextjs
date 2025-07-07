"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type React from "react";
import { useLanguage } from "@/contexts/language-context";

interface VintagePriceListPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VintagePriceListPopup: React.FC<VintagePriceListPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  // Activity icons matching VintagePackageCard
  const getActivityIcon = (activity: string) => {
    if (
      activity.toLowerCase().includes("riding") ||
      activity.toLowerCase().includes("ιππασια")
    ) {
      return "🐎"; // Horse emoji for riding
    }
    if (activity.toLowerCase().includes("rafting")) {
      return "🌊"; // Water wave emoji for rafting
    }
    if (
      activity.toLowerCase().includes("kayak") ||
      activity.toLowerCase().includes("καγιακ")
    ) {
      return "🚣"; // Rowing emoji for kayaking
    }
    return "•"; // Default bullet point
  };

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
            fixed inset-0 z-50 flex items-center justify-center bg-white/85 p-4
            backdrop-blur-sm
          `}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              relative max-h-[90vh] w-full max-w-2xl overflow-y-auto
              shadow-2xl
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vintage Card Container */}
            <div className="relative">
              {/* Vintage styling with CSS-in-JS */}
              <style jsx>{`
                .vintage-modal {
                  background: linear-gradient(135deg, #faf9f6 0%, #f5f2eb 100%);
                  border: 6px solid #2d5a3d;
                  border-radius: 16px;
                  position: relative;
                  padding: 2.5rem;
                  font-family: 'Playfair Display', 'Crimson Text', serif;
                  background-image:
                    radial-gradient(circle at 25% 75%, rgba(139, 161, 113, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 75% 25%, rgba(139, 161, 113, 0.08) 0%, transparent 50%);
                  box-shadow:
                    0 25px 50px rgba(45, 90, 61, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
                }

                .vintage-modal::before {
                  content: '';
                  position: absolute;
                  top: -4px;
                  left: -4px;
                  right: -4px;
                  bottom: -4px;
                  background: linear-gradient(45deg, #2d5a3d, #4a7c59, #2d5a3d);
                  border-radius: 24px;
                  z-index: -1;
                }

                .vintage-modal::after {
                  content: '';
                  position: absolute;
                  top: 15px;
                  left: 15px;
                  right: 15px;
                  bottom: 15px;
                  border: 2px solid #2d5a3d;
                  border-radius: 12px;
                  opacity: 0.3;
                  pointer-events: none;
                }

                .corner-flourish {
                  position: absolute;
                  width: 32px;
                  height: 32px;
                  border: 2px solid #2d5a3d;
                  opacity: 0.4;
                }

                .corner-flourish::before,
                .corner-flourish::after {
                  content: '';
                  position: absolute;
                  width: 16px;
                  height: 2px;
                  background: #2d5a3d;
                }

                .corner-flourish::before {
                  top: 50%;
                  left: -8px;
                  transform: translateY(-50%);
                }

                .corner-flourish::after {
                  left: 50%;
                  top: -8px;
                  transform: translateX(-50%) rotate(90deg);
                }

                .corner-flourish.top-left {
                  top: 20px;
                  left: 20px;
                  border-right: none;
                  border-bottom: none;
                  border-radius: 0 0 0 12px;
                }

                .corner-flourish.top-right {
                  top: 20px;
                  right: 20px;
                  border-left: none;
                  border-bottom: none;
                  border-radius: 0 0 12px 0;
                }

                .corner-flourish.bottom-left {
                  bottom: 20px;
                  left: 20px;
                  border-right: none;
                  border-top: none;
                  border-radius: 12px 0 0 0;
                }

                .corner-flourish.bottom-right {
                  bottom: 20px;
                  right: 20px;
                  border-left: none;
                  border-top: none;
                  border-radius: 0 12px 0 0;
                }

                .vintage-title {
                  font-family: 'Playfair Display', serif;
                  font-size: 2.25rem;
                  font-weight: 700;
                  color: #1a3d24;
                  text-align: center;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  margin-bottom: 2.5rem;
                  text-shadow: 1px 1px 2px rgba(0,0,0,0.08);
                  position: relative;
                }

                .vintage-title::after {
                  content: '';
                  position: absolute;
                  bottom: -12px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 100px;
                  height: 2px;
                  background: linear-gradient(to right, transparent, #2d5a3d, transparent);
                }

                .activity-section {
                  background: rgba(255, 255, 255, 0.7);
                  border: 2px solid #2d5a3d;
                  border-radius: 12px;
                  padding: 1.75rem;
                  margin-bottom: 1.5rem;
                  position: relative;
                  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.08);
                }

                .activity-title {
                  font-family: 'Playfair Display', serif;
                  font-size: 1.4rem;
                  font-weight: 700;
                  color: #1a3d24;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  margin-bottom: 1.25rem;
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                }

                .activity-icon {
                  font-size: 1.6rem;
                  width: 2.2rem;
                  text-align: center;
                }

                .price-item {
                  background: rgba(255, 255, 255, 0.9);
                  border: 2px solid #2d5a3d;
                  border-radius: 8px;
                  padding: 0.875rem 1.25rem;
                  margin: 0.625rem 0;
                  font-family: 'Playfair Display', serif;
                  font-weight: 600;
                  color: #1a3d24;
                  font-size: 1.05rem;
                  letter-spacing: 0.03em;
                  box-shadow: 0 2px 6px rgba(45, 90, 61, 0.06);
                }

                .includes-note {
                  font-style: italic;
                  color: #2d5a3d;
                  font-size: 0.95rem;
                  margin-bottom: 1rem;
                  padding: 0.5rem 1rem;
                  background: rgba(139, 161, 113, 0.1);
                  border-left: 3px solid #8ba171;
                  border-radius: 0 6px 6px 0;
                }

                .close-button {
                  background: linear-gradient(135deg, #2d5a3d 0%, #4a7c59 100%);
                  border: 2px solid #2d5a3d;
                  border-radius: 10px;
                  color: white;
                  font-family: 'Playfair Display', serif;
                  font-weight: 700;
                  font-size: 1.1rem;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  padding: 1rem 2rem;
                  width: 100%;
                  margin-top: 2.5rem;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.2);
                }

                .close-button:hover {
                  transform: translateY(-1px);
                  box-shadow: 0 6px 16px rgba(45, 90, 61, 0.3);
                  background: linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%);
                }

                .close-button:focus {
                  outline: 3px solid #8ba171;
                  outline-offset: 2px;
                }
              `}</style>

              <div className="vintage-modal">
                {/* Corner Flourishes */}
                <div className="corner-flourish top-left" />
                <div className="corner-flourish top-right" />
                <div className="corner-flourish bottom-left" />
                <div className="corner-flourish bottom-right" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={`
                    absolute top-4 right-4 rounded-full p-2 text-emerald-800
                    transition-all duration-200 z-10 bg-white/90 hover:bg-white
                    border-2 border-emerald-800 hover:border-emerald-900
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-600
                  `}
                  aria-label="Close"
                >
                  <X size={22} />
                </button>

                {/* Title */}
                <h2 className="vintage-title">{t.priceListPopup.title}</h2>

                {/* Activity Sections */}
                <div className="space-y-6">
                  {/* Riding Section */}
                  <div className="activity-section">
                    <h3 className="activity-title">
                      <span className="activity-icon">
                        {getActivityIcon("riding")}
                      </span>
                      {t.priceListPopup.ridingTitle}
                    </h3>
                    <div className="price-item">
                      {t.priceListPopup.riding_10_15_min}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.riding_30_min}
                    </div>
                  </div>

                  {/* Rafting Section */}
                  <div className="activity-section">
                    <h3 className="activity-title">
                      <span className="activity-icon">
                        {getActivityIcon("rafting")}
                      </span>
                      {t.priceListPopup.raftingTitle}
                    </h3>
                    <div className="includes-note">
                      {t.priceListPopup.raftingIncludes}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.raftingAdults}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.raftingChildren}
                    </div>
                  </div>

                  {/* Kayak Section */}
                  <div className="activity-section">
                    <h3 className="activity-title">
                      <span className="activity-icon">
                        {getActivityIcon("kayak")}
                      </span>
                      {t.priceListPopup.kayakTitle}
                    </h3>
                    <div className="includes-note">
                      {t.priceListPopup.kayakIncludes}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.kayakSingle}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.kayakDual}
                    </div>
                  </div>

                  {/* Extras Section */}
                  <div className="activity-section">
                    <h3 className="activity-title">
                      <span className="activity-icon">🥾</span>
                      {t.priceListPopup.extrasTitle}
                    </h3>
                    <div className="price-item">
                      {t.priceListPopup.extrasShoes}
                    </div>
                    <div className="price-item">
                      {t.priceListPopup.extrasPhoneCase}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="close-button"
                  aria-label="Close price list"
                >
                  {t.priceListPopup.close}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
