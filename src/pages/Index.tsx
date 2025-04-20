
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ChemicalInfo from "@/components/ChemicalInfo";
import ProductGrid from "@/components/ProductGrid";
import ManualCheck from "@/components/ManualCheck";
import Footer from "@/components/Footer";
import RegionalAnalysis from "@/components/RegionalAnalysis";
import NewsSection from "@/components/NewsSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 bg-grid-white/5 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero Section with enhanced gradient overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent pointer-events-none" />
          <Hero />
        </div>

        {/* Manual Check Section with animated blob backgrounds */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -top-1/3 -right-1/5 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
          <div className="absolute -bottom-1/3 -left-1/5 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
          <ManualCheck />
        </div>

        {/* News Section */}
        <div className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none" />
          <NewsSection />
        </div>

        {/* Regional Analysis Section */}
        <div className="relative py-12">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <RegionalAnalysis />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        {/* Chemical Info Section */}
        <div className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none" />
          <ChemicalInfo />
        </div>

        {/* Product Grid */}
        <div className="relative py-12">
          <div className="absolute inset-0 bg-grid-white/5 mask-gradient pointer-events-none" />
          <ProductGrid />
        </div>

        {/* About Section */}
        <div className="relative overflow-hidden py-16">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute -top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute -bottom-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000" />
          <About />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
