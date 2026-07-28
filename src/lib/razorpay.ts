// Razorpay checkout SDK loader
// Lazily injects the Razorpay script once and resolves when it's ready.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

let loadPromise: Promise<void> | null = null;

export function loadRazorpayScript(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null; // allow retry
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export interface RazorpayOptions {
  key: string;
  amount: number;        // in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
  onPaymentFailed?: (error: { description?: string; reason?: string; code?: string }) => void;
}

export function openRazorpayCheckout(options: RazorpayOptions): void {
  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (response: { error: { description?: string; reason?: string; code?: string } }) => {
    console.error("Razorpay payment failed:", response.error);
    options.onPaymentFailed?.(response.error);
  });
  rzp.open();
}
