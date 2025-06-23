
import { ArrowRight, AlertCircle, ShieldCheck, Upload, Sparkles, Star, Users, Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl animate-float delay-500" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6 mb-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">50,000+ products analyzed</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 rounded-full backdrop-blur-sm"
            >
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Award-Winning AI Food Safety Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              The Future of 
              <span className="block bg-gradient-to-r from-primary via-pink-500 to-blue-500 bg-clip-text text-transparent relative">
                Food Safety
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-pink-500/20 to-blue-500/20 rounded-lg blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <span className="block text-slate-900 dark:text-slate-100">is Here</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
            >
              Experience revolutionary AI technology that instantly analyzes packaged foods, providing comprehensive ingredient insights, safety ratings, and health recommendations in seconds.
            </motion.p>

            {/* Feature highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { icon: CheckCircle, text: "99.8% Accuracy" },
                { icon: Sparkles, text: "Real-time Analysis" },
                { icon: Shield, text: "FDA Compliant" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 hover:from-primary/90 hover:via-pink-500/90 hover:to-purple-600/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 group h-14 px-8 text-lg font-bold relative overflow-hidden"
                onClick={() => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                Start Free Analysis
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('manual-check')?.scrollIntoView({ behavior: 'smooth' })}
                className="group h-14 px-8 text-lg font-bold border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
              >
                Manual Check
                <Upload className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50"
            >
              {[
                { value: "50K+", label: "Products Analyzed", icon: ShieldCheck },
                { value: "99.8%", label: "Accuracy Rate", icon: Star },
                { value: "24/7", label: "AI Monitoring", icon: Users },
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-bold text-2xl text-slate-900 dark:text-slate-100">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Enhanced UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              {/* Main Analysis Interface */}
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 transform hover:scale-105 transition-transform duration-500">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-300">FoodSafe AI v2.0</div>
                </div>

                {/* Product Analysis Area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 via-purple-50 to-pink-50 dark:from-slate-700 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl mb-6 relative overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80" 
                    alt="Food product analysis preview" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* AI Scanning Effect */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-primary/50 rounded-2xl"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(147, 51, 234, 0.3)",
                        "0 0 40px rgba(147, 51, 234, 0.6)",
                        "0 0 20px rgba(147, 51, 234, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Analysis Progress */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Analyzing...</span>
                        <span className="text-sm font-bold text-primary">98%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-pink-500"
                          initial={{ width: 0 }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Results Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Analysis Complete</h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Caution</span>
                    </div>
                  </div>

                  {/* Safety Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">Safety Score</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">65/100</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">Confidence</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">92%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: "92%" }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Findings */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">Key Findings</h4>
                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <div>• High sodium content detected</div>
                      <div>• Artificial preservatives present</div>
                      <div>• Trans fats identified</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">AI Active</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-primary to-pink-500 text-white rounded-2xl shadow-xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="text-sm font-bold">24/7 Monitoring</div>
                <div className="text-xs opacity-90">Real-time updates</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
