"use client"

import { useState } from "react"
import { useMapsApi } from "@/contexts/maps-api-context"

export default function ApiKeyInput() {
  const { apiKey, setApiKey } = useMapsApi()
  const [inputKey, setInputKey] = useState("")
  const [isVisible, setIsVisible] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputKey.trim()) {
      setApiKey(inputKey.trim())
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs">
      {apiKey ? (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700">API Key Set</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleVisibility}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              type="button"
            >
              {isVisible ? "Hide Key" : "Show Key"}
            </button>
            <button
              onClick={() => setApiKey("")}
              className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded"
              type="button"
            >
              Reset
            </button>
          </div>
          {isVisible && (
            <div className="w-full mt-2 sm:mt-0">
              <code className="text-xs bg-gray-100 p-1 rounded break-all">{apiKey}</code>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Enter Google Maps API Key"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6b8362]"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#6b8362] text-white rounded-md text-sm hover:bg-[#5a7052] transition-colors"
          >
            Set API Key
          </button>
        </form>
      )}
    </div>
  )
} 