// Replace with the actual WhatsApp number (with country code, no + or spaces)
export const WHATSAPP_NUMBER = "919667305577";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Himansshu Ji, I'm interested in Planned Delivery Date Guidance. Please share more details."
);

export const getWhatsAppLink = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
