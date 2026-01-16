// ===============================
// WhatsApp Configuration
// ===============================

// Lebanese WhatsApp business number
export const WHATSAPP_NUMBER = "+96170073526";

// ===============================
// Message Generator
// ===============================
export const generateWhatsAppMessage = (
  productName: string,
  quantity: number,
  totalPrice: number,
  fullName: string,
  phone: string,
  address: string
): string => {
  const message = `Hello Art Haus 👋
I would like to place an order.

🧸 Product: ${productName}
📦 Quantity: ${quantity}
💰 Price: $${totalPrice.toFixed(2)}

👤 Name: ${fullName}
📞 Phone: ${phone}
📍 Address: ${address}

Thank you!`;

  // Encode message for URL
  return encodeURIComponent(message);
};

// ===============================
// WhatsApp URL Builder
// ===============================
export const getWhatsAppUrl = (encodedMessage: string): string => {
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
