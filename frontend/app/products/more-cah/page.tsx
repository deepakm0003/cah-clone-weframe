import ProductNavbar from "@/components/ProductNavbar";
import ProductHero from "@/components/ProductHero";
import RelatedProducts from "@/components/RelatedProducts";
import ProductFooter from "@/components/ProductFooter";
import { getMedusaProduct, getMedusaProducts } from "@/lib/medusa";

export default async function ProductPage() {
  // Fetch main product and related products concurrently
  const [productResp, productsResp] = await Promise.all([
    getMedusaProduct("more-cah").catch(() => null),
    getMedusaProducts().catch(() => null),
  ]);

  const product = productResp || undefined;
  
  // Exclude the main product from related products
  const relatedProducts = (productsResp || [])
    .filter(p => p.handle !== "more-cah")
    .map(p => ({
      ...p,
      // Map properties needed by RelatedProducts (like available etc)
      isNew: p.handle === "tales-vol-1" || p.handle === "shit-list",
      available: p.handle !== "twists-bundle", 
      price: p.variants?.[0]?.prices?.[0]
        ? new Intl.NumberFormat('en-IE', { style: 'currency', currency: p.variants[0].prices[0].currency_code }).format(p.variants[0].prices[0].amount / 100)
        : "€0.00",
      priceNum: p.variants?.[0]?.prices?.[0]?.amount 
        ? p.variants[0].prices[0].amount / 100 
        : 0,
    }));

  return (
    <main className="min-h-screen bg-black">
      <ProductNavbar />
      <ProductHero product={product} />
      <RelatedProducts products={relatedProducts} />
      <ProductFooter />
    </main>
  );
}
