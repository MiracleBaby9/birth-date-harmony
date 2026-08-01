

// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import crypto from "crypto";
// import { sendBookingNotifications } from "./_utils/notifications.js";
// import { supabase } from "./_utils/supabase.js";

// // ---------------------------------------------------------------------------
// // POST /api/verify-payment
// // Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// // Returns: { verified: true } or 400 error
// // ---------------------------------------------------------------------------

// export default async function handler(
//   req: VercelRequest,
//   res: VercelResponse
// ) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({
//       error: "Method not allowed",
//     });
//   }

//   const keySecret = process.env.RAZORPAY_KEY_SECRET;

//   if (!keySecret) {
//     console.error("RAZORPAY_KEY_SECRET missing from environment");

//     return res.status(500).json({
//       error: "Payment gateway not configured",
//     });
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
//     booking?: any;
//     packageName?: string;
//     amount?: number;
//   };

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature
//   ) {
//     return res.status(400).json({
//       error: "Missing required payment fields",
//     });
//   }

//   // Verify Razorpay signature
//   const body = `${razorpay_order_id}|${razorpay_payment_id}`;

//   const expectedSignature = crypto
//     .createHmac("sha256", keySecret)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature !== razorpay_signature) {
//     console.warn("Payment signature mismatch", {
//       razorpay_order_id,
//       razorpay_payment_id,
//     });

//     return res.status(400).json({
//       error: "Payment verification failed — invalid signature",
//     });
//   }

//   // Convert amount to paise
//   const amountInPaise =
//     typeof amount === "number" &&
//     Number.isFinite(amount) &&
//     amount > 0
//       ? Math.round(amount * 100)
//       : 0;

//   // -------------------------------------------------------------------------
//   // Step 1: Find or create the customer in the shared `customers` table.
//   // The CRM module (used by all three sites) reads from `customers`, not
//   // from `orders` — so without this step, orders/invoices would show up
//   // fine, but the customer would never appear in CRM.
//   // Matches on email first, then phone, so repeat customers aren't
//   // duplicated on every purchase.
//   // -------------------------------------------------------------------------
//   const customerEmail = booking.email || null;
//   const customerPhone = booking.whatsapp || null;

//   let customerId: string | null = null;

//   try {
//     let existingCustomer: { id: string } | null = null;

//     if (customerEmail) {
//       const { data } = await supabase
//         .from("customers")
//         .select("id")
//         .eq("email", customerEmail)
//         .maybeSingle();
//       existingCustomer = data;
//     }

//     if (!existingCustomer && customerPhone) {
//       const { data } = await supabase
//         .from("customers")
//         .select("id")
//         .eq("phone", customerPhone)
//         .maybeSingle();
//       existingCustomer = data;
//     }

//     if (existingCustomer) {
//       customerId = existingCustomer.id;

//       // Keep an existing customer's lifecycle stage current on repeat purchases too.
//       const { error: updateError } = await supabase
//         .from("customers")
//         .update({ lifecycle_stage: "Completed" })
//         .eq("id", customerId);

//       if (updateError) {
//         console.error("Supabase customer update failed:", updateError);
//       }
//     } else {
//       const { data: newCustomer, error: customerInsertError } = await supabase
//         .from("customers")
//         .insert({
//           full_name: booking.motherName || "Unknown",
//           email: customerEmail,
//           phone: customerPhone,
//           whatsapp: customerPhone,
//           source_website: "miraclebaby.ankshaastra.com",
//           lifecycle_stage: "Completed",
//           metadata: booking,
//         })
//         .select("id")
//         .single();

//       if (customerInsertError) {
//         console.error("Supabase customer insert failed:", customerInsertError);
//       } else {
//         customerId = newCustomer.id;
//       }
//     }
//   } catch (err) {
//     console.error("Unexpected error while finding/creating customer:", err);
//   }

//   // -------------------------------------------------------------------------
//   // Step 2: Save the order, linked to the customer above via customer_id.
//   // -------------------------------------------------------------------------
//   const { error: insertError } = await supabase
//   .from("orders")
//   .insert({
//     source_website: "miraclebaby.ankshaastra.com",

//     customer_id: customerId,
//     customer_name: booking.motherName || "",
//     customer_email: booking.email || "",
//     customer_phone: booking.whatsapp || "",

//     service_title: packageName,

//     amount: amount || 0,
//     total_amount: amount || 0,
//     currency: "INR",

//     status: "paid",

//     order_type: "service",
//     workflow_stage: "payment_received",

//     metadata: booking,

//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   });

//   if (insertError) {
//     console.error("Supabase insert failed:", insertError);
//   } else {
//     console.log("Order saved successfully in Supabase");
//   }

//   // Send email + WhatsApp notifications
//   const notificationResult =
//     await sendBookingNotifications({
//       booking,
//       packageName,
//       amountInPaise,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//     });

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

// FIX: this route writes the order directly into the hub's shared
// `orders` table, bypassing the hub's `operations/order-ingest` API
// entirely. That API is the only place that also triggers invoice
// generation — a direct table insert has no equivalent, so orders created
// here never got an automatic invoice (same gap found and fixed on
// Empower's api/verify-payment equivalent). `triggerHubInvoice()` calls a
// small dedicated hub endpoint (`/api/operations/trigger-invoice`) right
// after the order is created, using the same generate-now-else-queue logic
// the hub's own checkout uses. Best-effort/non-blocking: if this call
// fails, it's logged and swallowed — it must never break this route's
// existing response or the email/WhatsApp notifications below.
const HUB_API_BASE = (process.env.HUB_API_BASE || "https://ankshaastra.com/api").replace(/\/$/, "");
const HUB_API_KEY = process.env.HUB_API_KEY || process.env.OPERATIONS_API_KEY;

async function triggerHubInvoice(orderId: string | null | undefined, paymentId?: string) {
  if (!orderId) return;
  if (!HUB_API_KEY) {
    console.warn("[verify-payment] HUB_API_KEY not set — cannot trigger invoice generation for order:", orderId);
    return;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(`${HUB_API_BASE}/operations/trigger-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HUB_API_KEY,
      },
      body: JSON.stringify({ orderId, paymentId: paymentId || undefined }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[verify-payment] trigger-invoice call failed:", response.status, text);
    }
  } catch (err) {
    console.error("[verify-payment] trigger-invoice call threw:", err);
  }
}

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

  // -------------------------------------------------------------------------
  // Step 1: Find or create the customer in the shared `customers` table.
  // The CRM module (used by all three sites) reads from `customers`, not
  // from `orders` — so without this step, orders/invoices would show up
  // fine, but the customer would never appear in CRM.
  // Matches on email first, then phone, so repeat customers aren't
  // duplicated on every purchase.
  // -------------------------------------------------------------------------
  const customerEmail = booking.email || null;
  const customerPhone = booking.whatsapp || null;

  let customerId: string | null = null;

  try {
    let existingCustomer: { id: string } | null = null;

    if (customerEmail) {
      const { data } = await supabase
        .from("customers")
        .select("id")
        .eq("email", customerEmail)
        .maybeSingle();
      existingCustomer = data;
    }

    if (!existingCustomer && customerPhone) {
      const { data } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", customerPhone)
        .maybeSingle();
      existingCustomer = data;
    }

    if (existingCustomer) {
      customerId = existingCustomer.id;

      // Keep an existing customer's lifecycle stage current on repeat purchases too.
      const { error: updateError } = await supabase
        .from("customers")
        .update({ lifecycle_stage: "Completed" })
        .eq("id", customerId);

      if (updateError) {
        console.error("Supabase customer update failed:", updateError);
      }
    } else {
      const { data: newCustomer, error: customerInsertError } = await supabase
        .from("customers")
        .insert({
          full_name: booking.motherName || "Unknown",
          email: customerEmail,
          phone: customerPhone,
          whatsapp: customerPhone,
          source_website: "miraclebaby.ankshaastra.com",
          lifecycle_stage: "Completed",
          metadata: booking,
        })
        .select("id")
        .single();

      if (customerInsertError) {
        console.error("Supabase customer insert failed:", customerInsertError);
      } else {
        customerId = newCustomer.id;
      }
    }
  } catch (err) {
    console.error("Unexpected error while finding/creating customer:", err);
  }

  // -------------------------------------------------------------------------
  // Step 2: Save the order, linked to the customer above via customer_id.
  // FIX: added `.select("id").single()` so we get the new order's id back —
  // needed to call triggerHubInvoice() below. The insert itself is
  // unchanged.
  // -------------------------------------------------------------------------
  const { data: insertedOrder, error: insertError } = await supabase
  .from("orders")
  .insert({
    source_website: "miraclebaby.ankshaastra.com",

    customer_id: customerId,
    customer_name: booking.motherName || "",
    customer_email: booking.email || "",
    customer_phone: booking.whatsapp || "",

    service_title: packageName,

    amount: amount || 0,
    total_amount: amount || 0,
    currency: "INR",

    status: "paid",

    order_type: "service",
    workflow_stage: "payment_received",

    metadata: booking,

    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  })
  .select("id")
  .single();

  if (insertError) {
    console.error("Supabase insert failed:", insertError);
  } else {
    console.log("Order saved successfully in Supabase");
    // FIX: this is the missing step — nothing previously told the hub to
    // generate an invoice for this order.
    await triggerHubInvoice(insertedOrder?.id, razorpay_payment_id);
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
