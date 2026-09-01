import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export interface Product {
  docId: string;
  Name?: string;
  Cost?: Record<string, string>[];
  Description?: string;
  Brand?: string;
  Type?: string[] | string;
  images?: string[] | string;
  Benefits?: string[] | string;
  id?: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "Cosmetic"));
  return snapshot.docs.map(
    (doc) => ({ docId: doc.id, ...doc.data() }) as Product,
  );
}

export async function getProductsByType(type: string): Promise<Product[]> {
  const q = query(
    collection(db, "Cosmetic"),
    where("Type", "array-contains", type),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ docId: doc.id, ...doc.data() }) as Product,
  );
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const q = query(collection(db, "Cosmetic"), where("Brand", "==", brand));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ docId: doc.id, ...doc.data() }) as Product,
  );
}

export async function getProductsByBenefit(
  benefit: string,
): Promise<Product[]> {
  const q = query(
    collection(db, "Cosmetic"),
    where("Benefits", "array-contains", benefit),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ docId: doc.id, ...doc.data() }) as Product,
  );
}

export async function getProductByDocId(
  docId: string,
): Promise<Product | null> {
  const ref = doc(db, "Cosmetic", docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { docId: snap.id, ...snap.data() } as Product;
}

export async function getFilters(): Promise<{
  brands: string[];
  types: string[];
  benefits: string[];
}> {
  const products = await getAllProducts();

  const brands = [
    ...new Set(products.map((p) => p.Brand).filter(Boolean)),
  ] as string[];

  const typesSet = new Set<string>();
  products.forEach((p) => {
    if (Array.isArray(p.Type)) {
      p.Type.forEach((t) => typesSet.add(t));
    } else if (typeof p.Type === "string") {
      typesSet.add(p.Type);
    }
  });

  const benefitsSet = new Set<string>();
  products.forEach((p) => {
    if (Array.isArray(p.Benefits)) {
      p.Benefits.forEach((b) => benefitsSet.add(b));
    } else if (typeof p.Benefits === "string") {
      benefitsSet.add(p.Benefits);
    }
  });

  return { brands, types: [...typesSet], benefits: [...benefitsSet] };
}

// Допоміжна функція: завжди повертає масив зображень товару,
// незалежно від того, string це чи string[] у Firestore
export function getProductImages(product: Product): string[] {
  if (Array.isArray(product.images)) return product.images;
  if (typeof product.images === "string") return [product.images];
  return [];
}
