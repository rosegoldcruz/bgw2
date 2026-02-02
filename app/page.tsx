"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { DoorQuizModal } from "@/components/door-quiz-modal"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionStrip />
      <NewsletterSection />
      <Footer />
      <DoorQuizModal />
    </main>
  )
}
