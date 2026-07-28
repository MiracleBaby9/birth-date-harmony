import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
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

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

test();