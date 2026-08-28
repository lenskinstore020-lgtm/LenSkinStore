import type { Product } from "./products";

// ВАЖЛИВО: замініть на свій реальний номер WhatsApp у міжнародному форматі,
// без "+", пробілів і дужок. Наприклад для України: 380991234567
const WHATSAPP_PHONE = "48575233009";

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
    "Вітаю! Хочу оформити замовлення:",
    "",
    ...lines,
    "",
    "Будь ласка, підтвердіть наявність і деталі оплати.",
  ].join("\n");

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}
