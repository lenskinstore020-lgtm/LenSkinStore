export const brandLogos: Record<string, string> = {
  // без пробілу — точно як у Firestore
  iSClinical:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669782/isClinical.jpg",
  "Dr.Spiller":
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/Dr.Spiller.jpg",
  Histolab:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669777/histo2-720x1180.png",
  "ZO Skin Health":
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/ZO-Anti-Aging-Program.webp",
  Colorescience:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/evenupmulti-correctionserum_1_-auto_width_1500.jpg",
  Circadia:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/e4bb7e2ef59594d2204ee7dff47a9502.webp",
};

export function getBrandLogo(brand?: string): string | null {
  if (!brand) return null;
  return brandLogos[brand] ?? null;
}

// Бажаний порядок відображення брендів на сайті.
// Значення мають ТОЧНО збігатися з тим, як бренд записаний у Firestore (регістр, пробіли).
export const BRAND_ORDER = [
  "iSClinical",
  "Dr.Spiller",
  "Histolab",
  "ZO Skin Health",
  "Colorescience",
  "Circadia",
];

export function sortBrands(brands: string[]): string[] {
  return [...brands].sort((a, b) => {
    const indexA = BRAND_ORDER.indexOf(a);
    const indexB = BRAND_ORDER.indexOf(b);
    const posA = indexA === -1 ? BRAND_ORDER.length : indexA;
    const posB = indexB === -1 ? BRAND_ORDER.length : indexB;
    return posA - posB;
  });
}
