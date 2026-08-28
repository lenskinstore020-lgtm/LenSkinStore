import { getAllProducts } from "@/lib/products";
import FavoritesList from "../components/FavoritesList";

export const revalidate = 300;

export default async function FavoritesPage() {
  const products = await getAllProducts();
  return <FavoritesList products={products} />;
}
