import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_utils/supabase.js";

// ---------------------------------------------------------------------------
// POST /api/save-form-progress
//
// FIX: this endpoint did not exist on miraclebaby.ankshaastra.com even
// though the frontend (BookingFormModal.tsx) was already calling it while
// the customer types. Every call was silently 404ing (fire-and-forget, so
// it never surfaced as an error). Mirrors the hub's own
// server/handlers/save-form-progress.ts: upserts a "pending" row into the
// shared `orders` table, keyed on the client-generated `orderId`, so the
// customer's in-progress booking is tracked even before they submit.
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = (req.body || {}) as {
      orderId?: string;
      serviceTitle?: string;
      sourceWebsite?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      metadata?: Record<string, unknown>;
    };

    const orderId = body.orderId ? String(body.orderId) : null;
    if (!orderId) {
      return res.status(200).json({ ok: false, skipped: "no orderId" });
    }

    const { error } = await supabase.from("orders").upsert(
      {
        id: orderId,
        service_title: body.serviceTitle || "Service",
        amount: 0,
        gst_amount: 0,
        total_amount: 0,
        status: "pending",
        source_website: body.sourceWebsite || "miraclebaby.ankshaastra.com",
        order_type: "service",
        customer_name: body.customerName || null,
        customer_email: body.customerEmail || null,
        customer_phone: body.customerPhone || null,
        metadata: body.metadata || {},
      },
      { onConflict: "id" },
    );

    if (error) {
      // Best-effort only — never let this block the customer's form.
      console.error("[save-form-progress]", error.message);
      return res.status(200).json({ ok: false, error: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch (e: unknown) {
    console.error("[save-form-progress] unexpected error:", e);
    return res.status(200).json({ ok: false, error: e instanceof Error ? e.message : "unknown error" });
  }
}
