
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ChemicalInfo from "@/components/ChemicalInfo";
import ProductGrid from "@/components/ProductGrid";
import ManualCheck from "@/components/ManualCheck";
import Footer from "@/components/Footer";
import RegionalAnalysis from "@/components/RegionalAnalysis";
import NewsSection from "@/components/NewsSection";
import Scanner from "@/components/Scanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42_/_0.05)_1px,transparent_0)] [background-size:20px_20px] pointer-events-none" />
      
      <Navbar />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <Hero />
        </section>

        {/* Scanner Section */}
        <section className="relative py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          <Scanner />
        </section>

        {/* Manual Check Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-900/80 dark:to-slate-800/80" />
          <ManualCheck />
        </section>

        {/* News Section */}
        <section className="relative py-20 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
          <NewsSection />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
        </section>

        {/* Regional Analysis Section */}
        <section className="relative py-20">
          <RegionalAnalysis />
        </section>

        {/* Chemical Info Section */}
        <section className="relative py-20 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-900/50 dark:to-slate-800/50">
          <div className="absolute inset-0 backdrop-blur-sm" />
          <ChemicalInfo />
        </section>

        {/* Product Grid */}
        <section className="relative py-20 bg-white/60 dark:bg-slate-800/60">
          <ProductGrid />
        </section>

        {/* About Section */}
        <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
          <About />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
