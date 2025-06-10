'use client'

import { useEffect, useState } from 'react'

export default function BokunStyles() {
  const [nonce, setNonce] = useState('')

  useEffect(() => {
    // Get nonce from meta tag or existing script nonce
    const metaNonce =
      document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content') ||
      document.querySelector('script[nonce]')?.getAttribute('nonce') ||
      ''
    setNonce(metaNonce)
  }, [])

  return (
    <style jsx global nonce={nonce}>{`
      #bokun_5b20d531_ca57_4550_94c0_0511c35077a0 {
        background-color: #6b8362 !important; /* theme green */
        color: white !important;
        padding: 0.75rem 0 !important; /* py-3 */
        font-size: 1.125rem !important; /* text-lg */
        font-weight: 600 !important; /* font-semibold */
        border-radius: 0.5rem !important; /* rounded-lg */
        width: 100% !important;
        border: none !important;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        position: relative !important;
        overflow: hidden !important;
        transition: all 0.3s ease !important;
      }
      #bokun_5b20d531_ca57_4550_94c0_0511c35077a0:hover {
        background-color: #3e5a35 !important; /* darker green */
        transform: translateY(-2px) !important;
      }
      #bokun_5b20d531_ca57_4550_94c0_0511c35077a0:disabled {
        opacity: 0.95 !important;
        cursor: pointer !important;
      }
      #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53 {
        background-color: #b45309 !important; /* amber-700 */
        color: white !important;
        padding: 0.75rem 0 !important; /* py-3 */
        font-size: 1.125rem !important; /* text-lg */
        font-weight: 600 !important; /* font-semibold */
        border-radius: 0.5rem !important; /* rounded-lg */
        width: 100% !important;
        border: none !important;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        position: relative !important;
        overflow: hidden !important;
        transition: all 0.3s ease !important;
      }
      #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53:hover {
        background-color: #92400e !important; /* amber-800 */
        transform: translateY(-2px) !important;
      }
      #bokun_cfffa70c_61e3_4f58_91f4_e2f6cb562f53:disabled {
        opacity: 0.95 !important;
        cursor: pointer !important;
      }
    `}</style>
  )
}
