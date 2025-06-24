
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ChemicalInfo from "@/components/ChemicalInfo";
import ProductGrid from "@/components/ProductGrid";
import ManualCheck from "@/components/ManualCheck";
import Footer from "@/components/Footer";
import RegionalAnalysis from "@/components/RegionalAnalysis";
import Scanner from "@/components/Scanner";
import StorylineGuide from "@/components/StorylineGuide";
import Chatbot from "@/components/Chatbot";
import { useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen modern-gradient">
      {/* Enhanced background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(147_51_234_/_0.08)_1px,transparent_0)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Floating orbs for ambiance */}
      <div className="fixed top-20 left-10 w-72 h-72 floating-orb" />
      <div className="fixed bottom-20 right-10 w-96 h-96 floating-orb" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 floating-orb -translate-x-1/2 -translate-y-1/2" />
      
      <Navbar />
      
      <main className="relative">
        {/* Modern Hero Section - removed py-20 to eliminate gap */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-gradient" />
          <Hero />
        </section>

        {/* Enhanced Storyline Guide */}
        <section className="relative py-16 bg-white/30 backdrop-blur-sm">
          <StorylineGuide currentStep={currentStep} onStepChange={setCurrentStep} />
        </section>

        {/* Modern Scanner Section */}
        <section className="relative py-20 bg-gradient-to-b from-purple-100/40 to-pink-100/40">
          <div className="absolute inset-0 bg-grid-white opacity-20" />
          <Scanner />
        </section>

        {/* Enhanced Manual Check */}
        <section className="relative py-16">
          <ManualCheck />
        </section>

        {/* Modern Regional Analysis */}
        <section className="relative py-16 bg-white/40 backdrop-blur-sm">
          <RegionalAnalysis />
        </section>

        {/* Enhanced Chemical Info */}
        <section className="relative py-16 bg-slate-50/60 backdrop-blur-sm">
          <ChemicalInfo />
        </section>

        {/* Modern Product Grid */}
        <section className="relative py-16 bg-white/30 backdrop-blur-sm">
          <ProductGrid />
        </section>

        {/* Enhanced About Section */}
        <section className="relative py-16 bg-gradient-to-r from-purple-50/60 to-pink-50/60">
          <About />
        </section>
      </main>

      <Footer />
      
      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
