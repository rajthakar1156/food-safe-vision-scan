
import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <span className="text-primary font-bold text-xl">FoodSafe</span>
            <span className="text-foreground font-bold text-xl">Scan</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#scan" className="text-foreground hover:text-primary transition-colors">
            Scan
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-foreground hover:text-primary transition-colors">
                Resources <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="#chemicals" className="w-full">Chemical Database</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#manual-check" className="w-full">Manual Check</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
          <Button className="bg-primary text-white hover:bg-primary/90">Get Started</Button>
        </div>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-md absolute left-0 right-0 z-40">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a 
              href="#scan" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Scan
            </a>
            <a 
              href="#about" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#chemicals" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Chemical Database
            </a>
            <a 
              href="#manual-check" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Manual Check
            </a>
            <a 
              href="#contact" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <Button 
              className="bg-primary text-white hover:bg-primary/90 w-full"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
