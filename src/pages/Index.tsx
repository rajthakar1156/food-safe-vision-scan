
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
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Scanner />
        <ChemicalInfo />
        <ProductGrid />
        <About />
        <ManualCheck />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
