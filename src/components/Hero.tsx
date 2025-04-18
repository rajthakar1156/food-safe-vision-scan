
import { ArrowRight, AlertCircle, ShieldCheck, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto relative">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="md:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary"
            >
              <AlertCircle className="mr-1 h-3 w-3" />
              <span>Know what's in your food</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Detect harmful chemicals in your{" "}
              <span className="text-gradient bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                packaged food
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Scan product barcodes or check product names instantly to identify harmful additives, preservatives, and chemicals in Indian packaged foods. Make informed choices about what you consume.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                onClick={() => document.getElementById('manual-check')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Check Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                Scan Now
                <Scan className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex items-center space-x-4 text-sm"
            >
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
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-3xl -rotate-6 animate-pulse" />
              <div className="absolute inset-0 glass-card rounded-3xl shadow-lg flex items-center justify-center p-6">
                <div className="w-full max-w-xs aspect-[3/4] bg-black/30 rounded-xl overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1619566215014-4041f49eacad?q=80&w=1887&auto=format&fit=crop" 
                    alt="Indian packaged food" 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">
                    <div className="w-full h-24 bg-primary/30 backdrop-blur-sm relative overflow-hidden">
                      <motion.div 
                        className="h-1 w-full bg-primary absolute"
                        animate={{ 
                          y: ["0%", "100%", "0%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                    <div className="glass-card w-3/4 mt-4 p-3 rounded-lg text-sm">
                      <div className="font-semibold">Scanning...</div>
                      <div className="h-2 bg-black/30 rounded-full mt-1">
                        <motion.div 
                          className="h-2 bg-primary rounded-full"
                          animate={{ width: ["0%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
