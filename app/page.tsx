import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import VocabSection from "@/components/landing/VocabSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ChatBot from "@/components/ChatBot";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <VocabSection />
        <HowItWorks />
      </main>
      <ChatBot />
    </>
  );
}
