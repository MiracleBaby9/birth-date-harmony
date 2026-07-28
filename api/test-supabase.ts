import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_utils/supabase.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      source_website: "miraclebaby.ankshaastra.com",
      customer_name: "TEST USER",
      customer_email: "test@test.com",
      service_title: "TEST SERVICE",
      amount: 100,
      total_amount: 100,
      status: "paid",
    })
    .select();

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data);
}

