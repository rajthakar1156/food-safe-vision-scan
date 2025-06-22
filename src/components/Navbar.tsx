
import { useState } from "react";
import { Menu, X, Sparkles, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scannedCount, setScannedCount] = useState(12); // Mock data

  const handleGoogleLogin = () => {
    // Mock Google login - in real app, integrate with Google OAuth
    setIsLoggedIn(true);
    console.log('Google login initiated');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setScannedCount(0);
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center">
              <span className="text-primary font-bold text-xl">Food</span>
              <span className="text-slate-900 dark:text-slate-100 font-bold text-xl">Safe</span>
              <span className="text-primary font-bold text-xl ml-1">AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#scan" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-medium">
              Scanner
            </a>
            <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="/news" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-medium">
              News
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-medium">
                  Resources <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <a href="#chemicals" className="w-full">Chemical Database</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <a href="#manual-check" className="w-full">Manual Check</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-medium">
              Contact
            </a>
            
            {/* Authentication Section */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Scanned: {scannedCount}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-800">
                  <DropdownMenuItem>
                    <span>Total Products Scanned: {scannedCount}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all"
              >
                Sign in with Google
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-slate-700 dark:text-slate-300 p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col space-y-4">
              <a 
                href="#scan" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Scanner
              </a>
              <a 
                href="#about" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a 
                href="/news" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                News
              </a>
              <a 
                href="#chemicals" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Chemical Database
              </a>
              <a 
                href="#manual-check" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Manual Check
              </a>
              <a 
                href="#contact" 
                className="block py-2 text-slate-700 dark:text-slate-300 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-slate-600 dark:text-slate-400 text-sm">
                    Products Scanned: {scannedCount}
                  </div>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    handleGoogleLogin();
                    setIsOpen(false);
                  }}
                  className="bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 w-full mt-2"
                >
                  Sign in with Google
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
