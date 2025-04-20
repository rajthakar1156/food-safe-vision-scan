
import { ArrowRight, AlertCircle, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="lg:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-4 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20"
            >
              <AlertCircle className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Food Safety Analysis</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Know What's In Your 
              <span className="block mt-2 text-gradient bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Indian Food Products
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Instantly analyze packaged food products for harmful chemicals and additives. Make informed decisions about the food you consume with our advanced scanning and analysis technology.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 group"
                onClick={() => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Scan Product Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('manual-check')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-primary/20 hover:bg-primary/5"
              >
                Manual Product Check
                <Upload className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6"
            >
              {[
                { icon: ShieldCheck, text: "Instant Results" },
                { icon: ShieldCheck, text: "Indian Database" },
                { icon: ShieldCheck, text: "Detailed Analysis" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-3xl -rotate-6 animate-pulse-slow" />
              <div className="absolute inset-0 glass-card rounded-3xl shadow-lg flex items-center justify-center p-8">
                <div className="w-full max-w-sm aspect-[3/4] bg-black/30 rounded-xl overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1619566215014-4041f49eacad?q=80&w=1887&auto=format&fit=crop" 
                    alt="Indian packaged food" 
                    className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
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
                    <div className="glass-card w-4/5 mt-4 p-4 rounded-lg">
                      <div className="font-medium text-primary mb-2">Analysis Results</div>
                      <div className="space-y-2">
                        {["Preservatives", "Additives", "Safety Score"].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{item}</span>
                            <motion.div 
                              className="h-2 w-24 bg-primary/20 rounded-full overflow-hidden"
                              initial={{ width: 0 }}
                            >
                              <motion.div 
                                className="h-full bg-primary"
                                animate={{ width: ["0%", "100%"] }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </motion.div>
                          </div>
                        ))}
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
