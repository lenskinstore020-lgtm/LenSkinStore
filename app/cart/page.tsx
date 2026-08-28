import { getAllProducts } from "@/lib/products";
import CartList from "../components/CartList";

export const revalidate = 300;

export default async function CartPage() {
  const products = await getAllProducts();
  return <CartList products={products} />;
}
