import nodemailer from "nodemailer";

const contactPhone = "+91-9667305577";
const contactEmail = "social@ankshaastra.com";

const normalizeMobile = (value = "") => {
  const digits = value.toString().replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};

const formatAmount = (amountInPaise = 0) =>
  `₹${(amountInPaise / 100).toLocaleString("en-IN")}`;

const escapeHtml = (value = "") =>
  value
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error("SMTP configuration missing");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== "false",
    },
  });
};

const buildDetailsRows = (booking = {}) => {
  const rows = [
    ["Mother's Full Name", booking.motherName],
    ["Father's Full Name", booking.fatherName],
    ["Expected Delivery Date", booking.expectedDeliveryDate],
    ["Delivery City", booking.city],
    ["PIN Code", booking.pinCode],
    ["Hospital", booking.hospitalName],
    ["Email", booking.email],
    ["WhatsApp", booking.whatsapp],
    ["Numbers to Avoid / Prefer", booking.avoidOrPreferNumbers],
    ["Preferred Deity", booking.preferredDeity],
    ["Qualities to Manifest", booking.qualities],
  ];

  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#6b5f5a;">${escapeHtml(label)}</td><td style="padding:8px 0;text-align:right;font-weight:600;color:#2b2522;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
};

const buildEmailHtml = ({ booking, packageName, amountInPaise, orderId, paymentId, isAdmin }) => {
  const customerName = booking.motherName || booking.fatherName || "Valued Customer";
  const title = isAdmin ? "New Miracle Baby Booking" : "Payment Successful";
  const intro = isAdmin
    ? "A new C-section baby date guidance booking has been confirmed."
    : "Thank you for your booking. Your payment has been successfully processed.";

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#fbf3ef;font-family:Arial,sans-serif;color:#3f3834;">
        <div style="max-width:640px;margin:0 auto;padding:24px;">
          <div style="background:#2b2522;color:white;padding:28px;border-radius:14px 14px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:26px;">${title}</h1>
            <p style="margin:8px 0 0;color:#ead8d0;">Ankshaastra Miracle Baby</p>
          </div>
          <div style="background:white;padding:28px;border-radius:0 0 14px 14px;">
            <div style="display:inline-block;background:#10b981;color:white;padding:9px 14px;border-radius:6px;font-weight:700;">Payment Confirmed</div>
            <p style="font-size:15px;line-height:1.6;">Namaste ${escapeHtml(customerName)},</p>
            <p style="font-size:15px;line-height:1.6;">${intro}</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;border-top:1px solid #ead8d0;border-bottom:1px solid #ead8d0;">
              <tr><td style="padding:10px 0;color:#6b5f5a;">Package</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(packageName)}</td></tr>
              <tr><td style="padding:10px 0;color:#6b5f5a;">Amount Paid</td><td style="padding:10px 0;text-align:right;font-weight:700;">${formatAmount(amountInPaise)}</td></tr>
              <tr><td style="padding:10px 0;color:#6b5f5a;">Order ID</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(orderId)}</td></tr>
              <tr><td style="padding:10px 0;color:#6b5f5a;">Payment ID</td><td style="padding:10px 0;text-align:right;font-weight:700;">${escapeHtml(paymentId)}</td></tr>
            </table>
            <h2 style="font-size:18px;color:#2b2522;margin-top:24px;">Booking Details</h2>
            <table style="width:100%;border-collapse:collapse;">${buildDetailsRows(booking)}</table>
            <p style="font-size:14px;line-height:1.6;margin-top:24px;">Your guidance/report will be shared on your registered email or WhatsApp. For urgent support, call ${contactPhone}.</p>
            <p style="font-size:12px;color:#8c7f78;margin-top:24px;">Date selection is advisory in nature and does not replace medical advice. Final decisions should always be taken in consultation with your doctor.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function sendBookingEmailNotification({ booking, packageName, amountInPaise, orderId, paymentId }) {
  const customerEmail = booking.email;
  const adminEmail = process.env.ADMIN_EMAIL || contactEmail;

  if (!customerEmail && !adminEmail) {
    return { success: false, skipped: true, reason: "no_recipients" };
  }

  const transporter = getTransporter();
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const subjectSuffix = `- ${packageName} (${orderId})`;
  const results = [];

  if (customerEmail) {
    results.push(
      await transporter.sendMail({
        from,
        to: customerEmail,
        subject: `Payment Successful ${subjectSuffix}`,
        html: buildEmailHtml({ booking, packageName, amountInPaise, orderId, paymentId, isAdmin: false }),
      })
    );
  }

  if (adminEmail) {
    results.push(
      await transporter.sendMail({
        from,
        to: adminEmail,
        subject: `New Miracle Baby Booking ${subjectSuffix}`,
        html: buildEmailHtml({ booking, packageName, amountInPaise, orderId, paymentId, isAdmin: true }),
      })
    );
  }

  return { success: true, messageIds: results.map((item) => item.messageId).filter(Boolean) };
}

const sendWhatsAppMessage = async (to, text) => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId || !to) return false;

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: normalizeMobile(to),
      type: "text",
      text: { body: text },
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`WhatsApp API error (${response.status}): ${JSON.stringify(result)}`);
  }

  return true;
};

export async function sendBookingWhatsAppNotification({ booking, packageName, amountInPaise, orderId, paymentId }) {
  const customerName = booking.motherName || booking.fatherName || "there";
  const amount = formatAmount(amountInPaise);

  const customerMessage =
    `🙏 Namaste ${customerName}!\n\n` +
    `Thank you for booking *${packageName}* with Ankshaastra Miracle Baby.\n\n` +
    `✅ Payment Confirmed\n` +
    `💰 Amount Paid: *${amount}*\n` +
    `🔖 Order ID: *${orderId}*\n` +
    `🧾 Payment ID: *${paymentId}*\n\n` +
    `Your C-section baby date guidance will be shared on your registered email/WhatsApp.\n\n` +
    `For urgent support, call: *${contactPhone}*`;

  const adminMessage =
    `✅ *New Miracle Baby Booking*\n\n` +
    `👩 Mother: ${booking.motherName || "N/A"}\n` +
    `👨 Father: ${booking.fatherName || "N/A"}\n` +
    `📦 Package: ${packageName}\n` +
    `💰 Amount: ${amount}\n` +
    `🔖 Order ID: ${orderId}\n` +
    `🧾 Payment ID: ${paymentId}\n` +
    `📅 Expected Delivery: ${booking.expectedDeliveryDate || "N/A"}\n` +
    `📍 City/PIN: ${booking.city || "N/A"} - ${booking.pinCode || "N/A"}\n` +
    `🏥 Hospital: ${booking.hospitalName || "N/A"}\n` +
    `📧 Email: ${booking.email || "N/A"}\n` +
    `📱 WhatsApp: ${booking.whatsapp || "N/A"}\n` +
    (booking.avoidOrPreferNumbers ? `🔢 Numbers: ${booking.avoidOrPreferNumbers}\n` : "") +
    (booking.preferredDeity ? `🙏 Deity: ${booking.preferredDeity}\n` : "") +
    (booking.qualities ? `✨ Qualities: ${booking.qualities}\n` : "") +
    `🕐 Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  const customerSent = await sendWhatsAppMessage(booking.whatsapp, customerMessage).catch((error) => {
    console.error("Customer WhatsApp failed:", error.message);
    return false;
  });

  const adminSent = await sendWhatsAppMessage(process.env.WHATSAPP_ADMIN_NUMBER, adminMessage).catch((error) => {
    console.error("Admin WhatsApp failed:", error.message);
    return false;
  });

  return { success: customerSent || adminSent, customerSent, adminSent };
}

export async function sendBookingNotifications(payload) {
  const result = {
    email: { success: false, skipped: true },
    whatsapp: { success: false, skipped: true },
  };

  try {
    result.email = await sendBookingEmailNotification(payload);
  } catch (error) {
    console.error("Email notification failed:", error.message);
    result.email = { success: false, error: error.message };
  }

  try {
    result.whatsapp = await sendBookingWhatsAppNotification(payload);
  } catch (error) {
    console.error("WhatsApp notification failed:", error.message);
    result.whatsapp = { success: false, error: error.message };
  }

  return result;
}
