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
import { useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42_/_0.05)_1px,transparent_0)] [background-size:20px_20px] pointer-events-none" />
      
      <Navbar />
      
      <main className="relative">
        {/* Compact Hero Section */}
        <section className="relative py-16">
          <Hero />
        </section>

        {/* Storyline Guide */}
        <section className="relative py-12 bg-white/50 backdrop-blur-sm">
          <StorylineGuide currentStep={currentStep} onStepChange={setCurrentStep} />
        </section>

        {/* Compact Scanner Section */}
        <section className="relative py-16 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
          <Scanner />
        </section>

        {/* Compact Manual Check */}
        <section className="relative py-12">
          <ManualCheck />
        </section>

        {/* Other sections with reduced padding */}
        <section className="relative py-12">
          <RegionalAnalysis />
        </section>

        <section className="relative py-12 bg-slate-50/50">
          <ChemicalInfo />
        </section>

        <section className="relative py-12">
          <ProductGrid />
        </section>

        <section className="relative py-12 bg-slate-50">
          <About />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
