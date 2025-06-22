
import { Heart, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-primary font-bold text-2xl">Food</span>
                <span className="text-white font-bold text-2xl">Safe</span>
                <span className="text-primary font-bold text-2xl ml-1">AI</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-lg">
              Empowering consumers with AI-driven food safety analysis. Make informed choices about packaged foods with our cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", label: "Facebook" },
                { icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", label: "Twitter" },
                { icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01", label: "Instagram" }
              ].map((social, index) => (
                <a key={index} href="#" className="group">
                  <div className="w-12 h-12 bg-slate-800 hover:bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "#" },
                { name: "Scanner", href: "#scan" },
                { name: "About Us", href: "#about" },
                { name: "Chemical Database", href: "#chemicals" },
                { name: "Manual Check", href: "#manual-check" },
                { name: "News & Updates", href: "#news" }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="group flex items-center text-slate-400 hover:text-primary transition-colors">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl text-white">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-slate-400">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span>hello@foodsafeai.com</span>
              </li>
              <li className="flex items-center text-slate-400">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-slate-400">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span>San Francisco, CA</span>
              </li>
            </ul>
            
            <div className="pt-6">
              <h4 className="font-semibold text-lg text-white mb-4">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-slate-400"
                />
                <button className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-r-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-300 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} FoodSafeAI. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-2 text-red-400" /> for safer food choices
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
