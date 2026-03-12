import HeroSection from "@/components/HeroSection"
import DescriptionSection from "@/components/DescriptionSection"
import BuySection from "@/components/BuySection"
import StealSection from "@/components/StealSection"
import StuffSection from "@/components/StuffSection"
import EmailSection from "@/components/EmailSection"
import FAQSection from "@/components/FAQSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DescriptionSection />
      <BuySection />
      <StealSection />
      <StuffSection />
      <EmailSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
