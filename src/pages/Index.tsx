
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scanner from "@/components/Scanner";
import About from "@/components/About";
import ChemicalInfo from "@/components/ChemicalInfo";
import ManualCheck from "@/components/ManualCheck";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Scanner />
        <About />
        <ChemicalInfo />
        <ManualCheck />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
