// // // Centralized payment backend configuration.
// // // Update VITE_PAYMENT_API_BASE in your environment to override.

// // export const PAYMENT_API_BASE =
// //   (import.meta.env.VITE_PAYMENT_API_BASE as string | undefined)?.replace(/\/$/, "") ||
// //   "https://miraclebaby.ankshaastra.com";

// // export const CREATE_ORDER_URL = `${PAYMENT_API_BASE}/api/create-order`;
// // export const VERIFY_PAYMENT_URL = `${PAYMENT_API_BASE}/api/verify-payment`;


export const PAYMENT_API_BASE =
  (import.meta.env.VITE_PAYMENT_API_BASE as string | undefined)?.replace(/\/$/, "") ||
  "https://ankshaastra.com";

export const CREATE_ORDER_URL = `${PAYMENT_API_BASE}/api/create-order`;
export const VERIFY_PAYMENT_URL = `${PAYMENT_API_BASE}/api/verify-payment`;

