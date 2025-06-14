// Global type declarations for tracking and analytics

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | 'update',
      config?: {
        [key: string]: any;
        send_to?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
        event_category?: string;
        event_label?: string;
        package_name?: string;
        package_price?: number;
        button_id?: string;
        page_location?: string;
        page_title?: string;
        analytics_storage?: 'granted' | 'denied';
        ad_storage?: 'granted' | 'denied';
        ad_user_data?: 'granted' | 'denied';
        ad_personalization?: 'granted' | 'denied';
        analytics_consent?: boolean;
        marketing_consent?: boolean;
        consent_method?: string;
        items?: Array<{
          item_id?: string;
          item_name?: string;
          item_category?: string;
          price?: number;
          quantity?: number;
        }>;
      },
    ) => void;

    fbq?: (
      command: 'track' | 'consent',
      eventName: string | 'grant' | 'revoke',
      properties?: {
        [key: string]: any;
        content_name?: string;
        content_category?: string;
        value?: number;
        currency?: string;
      },
    ) => void;
  }
}

export {};
