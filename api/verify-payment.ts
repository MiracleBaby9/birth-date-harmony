// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import crypto from "crypto";
// import { sendBookingNotifications } from "./_utils/notifications.js";
// import { supabase } from "./_utils/supabase.js";

// // ---------------------------------------------------------------------------
// // POST /api/verify-payment
// // Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// // Returns: { verified: true } or 400 error
// // ---------------------------------------------------------------------------

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") return res.status(200).end();
//   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

//   const keySecret = process.env.RAZORPAY_KEY_SECRET;

//   if (!keySecret) {
//     console.error("RAZORPAY_KEY_SECRET missing from environment");
//     return res.status(500).json({ error: "Payment gateway not configured" });
//   }

//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     booking = {},
//     packageName = "C-Section Baby Date Guidance",
//     amount,
//   } = req.body as {
//     razorpay_order_id: string;
//     razorpay_payment_id: string;
//     razorpay_signature: string;
//     booking?: Record<string, string>;
//     packageName?: string;
//     amount?: number;
//   };

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res.status(400).json({ error: "Missing required payment fields" });
//   }

//   // Razorpay signature = HMAC-SHA256(order_id + "|" + payment_id, key_secret)
//   const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//   const expectedSignature = crypto
//     .createHmac("sha256", keySecret)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature !== razorpay_signature) {
//     console.warn("Payment signature mismatch", { razorpay_order_id, razorpay_payment_id });
//     return res.status(400).json({ error: "Payment verification failed — invalid signature" });
//   }

//   // Signature is valid — payment is genuine
//   const amountInPaise =
//     typeof amount === "number" && Number.isFinite(amount) && amount > 0
//       ? Math.round(amount * 100)
//       : 0;

//   await supabase.from("orders").insert({
//   source_website: "miraclebaby.ankshaastra.com",
//   customer_name: booking.motherName,
//   customer_email: booking.email,
//   customer_phone: booking.whatsapp,
//   service_title: packageName,
//   amount: amount,
//   total_amount: amount,
//   status: "paid",
//   razorpay_order_id,
//   razorpay_payment_id,
// });
//   const notificationResult = await sendBookingNotifications({
//     booking,
//     packageName,
//     amountInPaise,
//     orderId: razorpay_order_id,
//     paymentId: razorpay_payment_id,
//   });

//   return res.status(200).json({
//     verified: true,
//     payment_id: razorpay_payment_id,
//     order_id: razorpay_order_id,
//     notifications: notificationResult,
//   });
// }


import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { sendBookingNotifications } from "./_utils/notifications.js";
import { supabase } from "./_utils/supabase.js";

// ---------------------------------------------------------------------------
// POST /api/verify-payment
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Returns: { verified: true } or 400 error
// ---------------------------------------------------------------------------

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    console.error("RAZORPAY_KEY_SECRET missing from environment");

    return res.status(500).json({
      error: "Payment gateway not configured",
    });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    booking = {},
    packageName = "C-Section Baby Date Guidance",
    amount,
  } = req.body as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    booking?: any;
    packageName?: string;
    amount?: number;
  };

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return res.status(400).json({
      error: "Missing required payment fields",
    });
  }

  // Verify Razorpay signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.warn("Payment signature mismatch", {
      razorpay_order_id,
      razorpay_payment_id,
    });

    return res.status(400).json({
      error: "Payment verification failed — invalid signature",
    });
  }

  // Convert amount to paise
  const amountInPaise =
    typeof amount === "number" &&
    Number.isFinite(amount) &&
    amount > 0
      ? Math.round(amount * 100)
      : 0;

  // Save order in shared Supabase database
  const { error: insertError } = await supabase
  .from("orders")
  .insert({
    source_website: "miraclebaby.ankshaastra.com",

    customer_name: booking.motherName || "",
    customer_email: booking.email || "",
    customer_phone: booking.whatsapp || "",

    service_title: packageName,

    amount: amount || 0,
    total_amount: amount || 0,
    currency: "INR",                 // ← ADD KIYA

    status: "paid",

    order_type: "service",          // ← ADD KIYA
    workflow_stage: "payment_completed", // ← ADD KIYA

    metadata: booking,              // ← ADD KIYA

    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (insertError) {
    console.error("Supabase insert failed:", insertError);
  } else {
    console.log("Order saved successfully in Supabase");
  }

  // Send email + WhatsApp notifications
  const notificationResult =
    await sendBookingNotifications({
      booking,
      packageName,
      amountInPaise,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

  return res.status(200).json({
    verified: true,
    payment_id: razorpay_payment_id,
    order_id: razorpay_order_id,
    notifications: notificationResult,
  });
}
