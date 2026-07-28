import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// POST /api/create-order
// Body: { amount: number (INR, e.g. 1100), currency?: string, receipt?: string }
// Returns: Razorpay order object { id, amount, currency, receipt, key_id }
// ---------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — allow same origin only in production; adjust if needed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error("Razorpay credentials missing from environment");
    return res.status(500).json({ error: "Payment gateway not configured" });
  }

  const { amount, currency = "INR", receipt } = req.body as {
    amount: number | string;
    currency?: string;
    receipt?: string;
  };

  const parsedAmount =
    typeof amount === "string" ? Number(amount.replace(/[^0-9.]/g, "")) : amount;

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  // Razorpay expects amount in paise (multiply INR × 100)
  const amountInPaise = Math.round(parsedAmount * 100);
  if (amountInPaise < 100) {
    return res.status(400).json({ error: "Minimum payment amount is ₹1" });
  }

  // Generate a unique receipt id if not provided
  const receiptId = receipt || `rcpt_${crypto.randomBytes(6).toString("hex")}`;

  try {
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: currency.toUpperCase(),
        receipt: receiptId,
      }),
    });

    if (!razorpayRes.ok) {
      let userError = "Payment service error. Please try again.";
      if (razorpayRes.status >= 400 && razorpayRes.status < 500) {
        try {
          const errBody = await razorpayRes.json();
          console.error("Razorpay client error:", errBody);
          const desc = errBody.error?.description || "";
          if (desc) userError = desc;
          if (desc.includes("key")) userError = "Payment configuration issue - contact support.";
          if (desc.includes("Authentication failed")) userError = "Razorpay authentication failed. Check API keys.";
          if (errBody.error?.code === "GATEWAY_ERROR") userError = "Gateway unavailable, try later.";
        } catch (jsonErr) {
          console.error("Failed to parse Razorpay error JSON:", jsonErr);
        }
        return res.status(400).json({ error: userError });
      } else {
        const errText = await razorpayRes.text();
        console.error(`Razorpay server error ${razorpayRes.status}:`, errText.slice(0, 1000));
      }
      return res.status(502).json({ error: userError });
    }

    const order = await razorpayRes.json();
    
    // Include key_id for frontend SDK
    const response = {
      ...order,
      key_id: keyId,
    };
    
    console.log("Order created successfully:", { id: order.id, amount: order.amount / 100, receipt: order.receipt });
    return res.status(200).json(response);
  } catch (err: unknown) {
    console.error("Unexpected error in create-order:", err instanceof Error ? err.message : err);
    return res.status(500).json({ error: "Internal server error. Please contact support." });
  }
}

