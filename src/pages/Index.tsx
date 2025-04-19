
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scanner from "@/components/Scanner";
import About from "@/components/About";
import ChemicalInfo from "@/components/ChemicalInfo";
import ProductGrid from "@/components/ProductGrid";
import ManualCheck from "@/components/ManualCheck";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-white/10 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-tr from-background via-background/95 to-background/90 pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero Section with Gradient Overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />
          <Hero />
        </div>

        {/* Scanner Section with Glass Effect */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
          <ManualCheck />
          <Scanner />
        </div>

        {/* Chemical Info Section with Gradient Divider */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none" />
          <ChemicalInfo />
        </div>

        {/* Product Grid with Background Pattern */}
        <div className="relative">
          <div className="absolute inset-0 bg-grid-white/5 mask-gradient pointer-events-none" />
          <ProductGrid />
        </div>

        {/* About Section with Glass Effect */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <About />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
