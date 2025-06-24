
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Scan, Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient glow-text glow-primary">
              Know What You
            </span>
            <br />
            <span className="text-foreground">
              Eat & Stay Safe
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scan packaged foods, analyze harmful chemicals, and discover healthier alternatives 
            with our AI-powered food safety platform designed for Indian consumers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="btn-primary group">
            <Scan className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Start Scanning Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {/* Professional Google Sign-in Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-2xl glass-card card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Scan className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Scanning</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered ingredient analysis in seconds
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl glass-card card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              Identify harmful chemicals and additives
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl glass-card card-hover">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Find Alternatives</h3>
            <p className="text-sm text-muted-foreground">
              Discover healthier product options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
