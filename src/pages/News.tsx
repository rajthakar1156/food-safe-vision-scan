
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const News = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(15_23_42_/_0.05)_1px,transparent_0)] [background-size:20px_20px] pointer-events-none" />
      
      <Navbar />
      
      <main className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Food Safety News & Updates
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Stay informed with the latest developments in food safety, regulations, and health insights.
            </p>
          </div>
          
          <NewsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
