// WhatsApp configuration - Update this number for your business
export const WHATSAPP_NUMBER = "+96170123456"; // Replace with your actual Lebanese WhatsApp number

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

  return encodeURIComponent(message);
};

export const getWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
};
