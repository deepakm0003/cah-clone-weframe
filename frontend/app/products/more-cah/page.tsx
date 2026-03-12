import ProductNavbar from "@/components/ProductNavbar";
import ProductHero from "@/components/ProductHero";
import RelatedProducts from "@/components/RelatedProducts";
import ProductFooter from "@/components/ProductFooter";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-black">
      <ProductNavbar />
      <ProductHero />
      <RelatedProducts />
      <ProductFooter />
    </main>
  );
}
