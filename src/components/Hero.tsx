
import { ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <AlertCircle className="mr-1 h-3 w-3" />
              <span>Know what's in your food</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Detect harmful chemicals in your{" "}
              <span className="text-primary">packaged food</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Scan product barcodes to instantly check for harmful additives, preservatives, and chemicals. Make informed choices about what you consume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Scan Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('manual-check')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Manual Check
              </Button>
            </div>
            <div className="pt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4 text-safe" />
                <span>Safe Ingredients</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4 text-safe" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4 text-safe" />
                <span>Reliable Data</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary rounded-3xl -rotate-6"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg flex items-center justify-center p-6">
                <div className="w-full max-w-xs aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1619566215014-4041f49eacad?q=80&w=1887&auto=format&fit=crop" 
                    alt="Packaged chips" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20">
                    <div className="w-full h-24 bg-primary/30 backdrop-blur-sm relative overflow-hidden">
                      <div className="h-1 w-full bg-primary absolute animate-scan"></div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm w-3/4 mt-4 p-3 rounded-lg text-sm">
                      <div className="font-semibold">Scanning...</div>
                      <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-2 bg-primary rounded-full w-2/3 animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
