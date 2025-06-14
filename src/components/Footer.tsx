
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-primary font-bold text-2xl">FoodSafe</span>
              <span className="text-foreground font-bold text-2xl">Scan</span>
            </div>
            <p className="text-foreground mb-6 max-w-md opacity-90">
              Helping consumers make informed choices about packaged foods by identifying potentially harmful chemicals and additives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors bg-background/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors bg-background/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors bg-background/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>Home</a></li>
              <li><a href="#scan" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>Scan Product</a></li>
              <li><a href="#about" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>About Us</a></li>
              <li><a href="#chemicals" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>Chemical Database</a></li>
              <li><a href="#manual-check" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>Manual Check</a></li>
              <li><a href="#news" className="text-foreground opacity-90 hover:text-primary hover:opacity-100 transition-colors flex items-center"><span className="h-1 w-1 bg-primary rounded-full mr-2"></span>News & Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="text-foreground opacity-90 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                support@foodsafescan.com
              </li>
              <li className="text-foreground opacity-90 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="text-foreground opacity-90 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                123 Health St, Wellness City
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-background border border-border rounded-l-md flex-1 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground opacity-90 text-sm">
            &copy; {new Date().getFullYear()} FoodSafeScan. All rights reserved.
          </p>
          <p className="text-foreground opacity-90 text-sm flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-danger" /> for safer food consumption
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
