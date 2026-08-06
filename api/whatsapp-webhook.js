const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "ankshaastra_webhook_verify";
const WA_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_NUM = process.env.WHATSAPP_ADMIN_NUMBER;

const normalizeMobile = (value = "") => {
  const digits = value.toString().replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};

async function sendWhatsApp(to, text) {
  if (!WA_TOKEN || !PHONE_ID || !to) return false;

  const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: normalizeMobile(to),
      type: "text",
      text: { body: text },
    }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(`WhatsApp API error (${response.status}): ${JSON.stringify(result)}`);
  }

  return true;
}

async function handleIncomingText({ from, senderName, text }) {
  const lower = text.toLowerCase();

  if (lower.includes("report") || lower.includes("status") || lower.includes("order")) {
    await sendWhatsApp(
      from,
      `🙏 Namaste ${senderName}!\n\nThank you for reaching out to *Ankshaastra Miracle Baby*.\n\nPlease share your *Payment ID*, *registered email*, or *WhatsApp number* used while booking. Our team will check and respond shortly.\n\n📞 Urgent support: *+91-9667305577*`
    );
    return;
  }

  if (lower.includes("price") || lower.includes("package") || lower.includes("cost")) {
    await sendWhatsApp(
      from,
      `🌟 *Miracle Baby Packages*\n\nPlease visit https://miraclebaby.ankshaastra.com/#pricing for the latest package prices.\n\n📞 Call: *+91-9667305577*`
    );
    return;
  }

  await sendWhatsApp(
    from,
    `🙏 Namaste ${senderName}!\n\nThank you for contacting *Ankshaastra Miracle Baby*.\n\nOur team has received your message and will respond shortly.\n\n📞 For urgent queries: *+91-9667305577*\n📧 Email: *miraclebaby@ankshaastra.in*`
  );
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).json({ error: "Forbidden - verify token mismatch" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.status(200).json({ status: "ok" });

  try {
    const body = req.body;
    if (body.object !== "whatsapp_business_account") return;

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];
    if (!message) return;

    const from = message.from;
    const senderName = value.contacts?.[0]?.profile?.name || "there";
    const messageText = message.text?.body || `[${message.type}]`;

    if (message.type === "text") {
      await handleIncomingText({ from, senderName, text: messageText.trim() });
    }

    if (ADMIN_NUM && normalizeMobile(from) !== normalizeMobile(ADMIN_NUM)) {
      await sendWhatsApp(
        ADMIN_NUM,
        `📱 *New Miracle Baby WhatsApp Message*\n\n👤 From: ${senderName} (+${from})\n💬 Message: ${messageText}\n🕐 Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      ).catch(() => {});
    }
  } catch (error) {
    console.error("WhatsApp webhook error:", error.message);
  }
}
