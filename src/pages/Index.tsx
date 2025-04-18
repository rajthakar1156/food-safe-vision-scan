
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent pointer-events-none" />
          <ManualCheck />
          <Scanner />
          <div className="relative">
            <ChemicalInfo />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none" />
          </div>
        </div>
        <ProductGrid />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
