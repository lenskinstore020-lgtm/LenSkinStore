import type { Product } from "./products";

// ВАЖЛИВО: замініть на свій реальний номер WhatsApp у міжнародному форматі,
// без "+", пробілів і дужок. Наприклад для України: 380991234567
const WHATSAPP_PHONE = "16478904645";

export interface CartItemWithProduct extends Product {
  quantity: number;
}

export function buildWhatsAppOrderLink(items: CartItemWithProduct[]): string {
  const lines = items.map((item) => {
    const priceLine =
      item.Cost && item.Cost[0]
        ? Object.entries(item.Cost[0])[0].join(" - ")
        : "";
    return `• ${item.Name} x${item.quantity}${priceLine ? ` (${priceLine})` : ""}`;
  });

  const message = [
    "Hi! I would like to place a order  ",
    "",
    ...lines,
    "",
    "Please confirm the payment details",
  ].join("\n");

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}
