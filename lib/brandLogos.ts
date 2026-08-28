export const brandLogos: Record<string, string> = {
  // без пробілу — точно як у Firestore
  iSClinical:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669782/isClinical.jpg",
  Circadia:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/e4bb7e2ef59594d2204ee7dff47a9502.webp",
  Colorescience:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/evenupmulti-correctionserum_1_-auto_width_1500.jpg",
  "Dr.Spiller":
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/Dr.Spiller.jpg",
  Histolab:
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669777/histo2-720x1180.png",
  "ZO Skin Health":
    "https://res.cloudinary.com/z88a2was/image/upload/v1787669776/ZO-Anti-Aging-Program.webp",
};

export function getBrandLogo(brand?: string): string | null {
  if (!brand) return null;
  return brandLogos[brand] ?? null;
}
