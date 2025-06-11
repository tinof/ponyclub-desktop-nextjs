'use client'

import type { IFrameOptions } from 'iframe-resizer'
import { iframeResizer } from 'iframe-resizer' // Types for v3/v4
import { useEffect, useRef } from 'react'

import { useLanguage } from '@/contexts/language-context'
import { bokunLangMap } from '@/lib/bokun-lang'

// Define proper types for iframe resizer callbacks
interface MessageData {
  iframe: HTMLIFrameElement
  message: unknown
}

interface SizeData {
  iframe: HTMLIFrameElement
  height: number
  width: number
  type: string
}

type BokunWidgetProps = {
  experienceId: string
  partialView?: number
}

export default function BokunWidget({ experienceId, partialView = 1 }: BokunWidgetProps) {
  const { language } = useLanguage()
  const bokunLang = bokunLangMap[language] || 'en'
  const widgetContainerRef = useRef<HTMLDivElement>(null)

  const baseUrl = 'https://widgets.bokun.io/online-sales/c078b762-6f7f-474f-8edb-bdd1bdb7d12a/experience'
  const bokunWidgetSrcUrl = `${baseUrl}/${experienceId}?partialView=${partialView}&lang=${bokunLang}`

  useEffect(() => {
    const containerElement = widgetContainerRef.current
    if (!containerElement) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Bokun Widget Parent] Container ref not found.')
      }
      return
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Bokun Widget Parent] useEffect triggered. Container element:', containerElement)
    }

    const options: IFrameOptions & {
      onMessage?: (messageData: MessageData) => void
      onResized?: (sizeData: SizeData) => void
      onInit?: (iFrameEl: HTMLIFrameElement) => void
    } = {
      log: process.env.NODE_ENV === 'development', // Enable logs only in dev
      checkOrigin: false, // Be cautious in production
      // Updated to use current callback names
      onMessage: (messageData: MessageData) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] Received message from iframe (onMessage):', messageData.message)
        }
        // Potentially handle specific messages if needed in the future
      },
      onResized: (sizeData: SizeData) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] iframeResizer onResized:', sizeData)
        }
      },
      onInit: (iFrameEl: HTMLIFrameElement) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] iframeResizer onInit: iframe is ready.', iFrameEl)
        }
      },
    }

    // Ensure window.iFrameResizer exists and has onMessage, onResized, onInit
    // This is a workaround for the "onMessage function not defined" warning
    // if the Bokun widget's internal iframe-resizer script is looking for a global function.
    interface WindowWithIFrameResizer extends Window {
      iFrameResizer?: {
        onMessage?: (messageData: MessageData) => void
        onResized?: (sizeData: SizeData) => void
        onInit?: (iFrameEl: HTMLIFrameElement) => void
      }
    }

    const windowWithResizer = window as WindowWithIFrameResizer
    if (!windowWithResizer.iFrameResizer) {
      windowWithResizer.iFrameResizer = {}
    }
    windowWithResizer.iFrameResizer.onMessage = (messageData: MessageData) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          '[Bokun Widget Parent] window.iFrameResizer.onMessage received:',
          messageData.message,
          'from iframe:',
          messageData.iframe.id
        )
      }
      // Call the options.onMessage handler as well
      if (options.onMessage) {
        options.onMessage(messageData)
      }
    }
    windowWithResizer.iFrameResizer.onResized = options.onResized
    windowWithResizer.iFrameResizer.onInit = options.onInit

    // 1. Initialize iframeResizer for the iframe embedded within this component (catalogue view)
    const catalogueObserver = new MutationObserver((_mutationsList, observerInstance) => {
      const catalogueIframe = containerElement.querySelector('iframe')
      if (catalogueIframe && !catalogueIframe.dataset.resizerAttached) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] Found catalogue iframe, initializing iframeResizer:', catalogueIframe)
        }
        try {
          iframeResizer(options, catalogueIframe)
          catalogueIframe.dataset.resizerAttached = 'true' // Mark as initialized
          if (process.env.NODE_ENV === 'development') {
            console.log('[Bokun Widget Parent] iframeResizer initialized for catalogue iframe.')
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Bokun Widget Parent] Error initializing iframeResizer for catalogue iframe:', error)
          }
        }
        observerInstance.disconnect() // Stop observing once the catalogue iframe is found and initialized
      } else if (catalogueIframe?.dataset.resizerAttached) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] Catalogue iframe already has resizer attached.')
        }
        observerInstance.disconnect()
      } else if (process.env.NODE_ENV === 'development') {
        console.log('[Bokun Widget Parent] Catalogue iframe not found yet in MutationObserver callback.')
      }
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('[Bokun Widget Parent] Starting MutationObserver on container for catalogue iframe.')
    }
    catalogueObserver.observe(containerElement, { childList: true, subtree: true })

    // 2. Initialize iframeResizer for the cart iframe injected into the body by Bokun
    const bodyObserver = new MutationObserver((_mutationsList, _observerInstance) => {
      const cartIframe = document.getElementById('bokun-widgets-cart') as HTMLIFrameElement | null
      // Check if the cart iframe exists and hasn't been initialized yet
      if (cartIframe && !cartIframe.dataset.resizerAttached) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Bokun Widget Parent] Found cart iframe in body, initializing iframeResizer:', cartIframe)
        }
        try {
          iframeResizer(options, cartIframe)
          cartIframe.dataset.resizerAttached = 'true' // Mark as initialized
          if (process.env.NODE_ENV === 'development') {
            console.log('[Bokun Widget Parent] iframeResizer initialized for cart iframe.')
          }
          // Optional: Disconnect if you only expect one cart iframe instance
          // observerInstance.disconnect();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Bokun Widget Parent] Error initializing iframeResizer for cart iframe:', error)
          }
        }
      }
      // Cart iframe already has resizer attached - no action needed
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('[Bokun Widget Parent] Starting MutationObserver on document body for cart iframe.')
    }
    // Observe the body for additions/removals, including the cart iframe
    bodyObserver.observe(document.body, { childList: true, subtree: false }) // Observe direct children of body

    // Cleanup function
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Bokun Widget Parent] useEffect cleanup: Disconnecting observers.')
      }
      catalogueObserver.disconnect()
      bodyObserver.disconnect()
      // Note: iframe-resizer v4 might need manual cleanup if iframes are removed dynamically.
      // e.g., iframeResizer.iframeResizer.close(iframeElement)
      // For now, relying on component unmount and observer disconnect.
    }
  }, [bokunWidgetSrcUrl]) // Re-run if the URL changes

  return (
    <>
      <div
        ref={widgetContainerRef}
        className='bokunWidget'
        data-src={bokunWidgetSrcUrl}
        data-lang={bokunLang}
        style={{ width: '100%', minHeight: '500px' }} // Ensure div has dimensions
      >
        {/* Bokun's script will inject the iframe here */}
      </div>
      <noscript>Please enable javascript in your browser to book</noscript>
    </>
  )
}
