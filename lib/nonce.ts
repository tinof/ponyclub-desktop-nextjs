import { headers } from 'next/headers';

/**
 * Get the CSP nonce from middleware headers
 * This nonce should be used for inline scripts and styles that need CSP approval
 * 
 * @returns Promise<string> The nonce value or empty string if not found
 */
export async function getNonce(): Promise<string> {
  try {
    const headersList = await headers();
    return headersList.get('x-nonce') || '';
  } catch (error) {
    // In case headers() fails (e.g., in static generation)
    console.warn('Failed to get nonce from headers:', error);
    return '';
  }
}

/**
 * Generate a fallback nonce for development or static generation
 * This should only be used when the middleware nonce is not available
 * 
 * @returns string A base64 encoded random nonce
 */
export function generateFallbackNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return Buffer.from(crypto.randomUUID()).toString('base64');
  }
  // Fallback for environments without crypto.randomUUID
  return Buffer.from(Math.random().toString(36).substring(2)).toString('base64');
}