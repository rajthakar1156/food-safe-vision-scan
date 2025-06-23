import { useState } from "react";
import { Menu, X, Sparkles, ChevronDown, User, Mail, LogOut, Settings, History, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  email: string;
  name: string;
  avatar: string;
  verified: boolean;
}

interface ScanHistory {
  id: string;
  productName: string;
  brand: string;
  scanDate: string;
  riskLevel: "low" | "medium" | "high";
  image: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [scannedCount, setScannedCount] = useState(0);
  const [showScanHistory, setShowScanHistory] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth process
      setIsLoggedIn(true);
      
      // Mock user profile data from Google
      const mockProfile: UserProfile = {
        email: "user@example.com",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
        verified: true
      };
      
      setUserProfile(mockProfile);
      setScannedCount(12); // Mock previous scan count
      
      // Mock scan history
      const mockHistory: ScanHistory[] = [
        {
          id: "1",
          productName: "Lay's Magic Masala",
          brand: "Lay's",
          scanDate: "2024-01-15",
          riskLevel: "medium",
          image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483620a.jpg"
        },
        {
          id: "2",
          productName: "Parle-G Biscuits",
          brand: "Parle",
          scanDate: "2024-01-14",
          riskLevel: "low",
          image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/8901030835784_1.jpg"
        },
        {
          id: "3",
          productName: "Maggi Masala Noodles",
          brand: "Nestle",
          scanDate: "2024-01-13",
          riskLevel: "high",
          image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/8901030833533_5.jpg"
        }
      ];
      
      setScanHistory(mockHistory);
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${mockProfile.email}`,
        variant: "default",
      });
      
      console.log('Google login successful:', mockProfile);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Unable to connect with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setScannedCount(0);
    setScanHistory([]);
    setShowScanHistory(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  const handleResendVerification = () => {
    toast({
      title: "Verification email sent",
      description: "Please check your email for verification instructions.",
      variant: "default",
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  if (showScanHistory) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Scan History</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowScanHistory(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
            <div className="grid gap-4">
              {scanHistory.map((scan) => (
                <div key={scan.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <img 
                    src={scan.image} 
                    alt={scan.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{scan.productName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{scan.brand}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{scan.scanDate}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(scan.riskLevel)}`}>
                    {scan.riskLevel.charAt(0).toUpperCase() + scan.riskLevel.slice(1)} Risk
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center">
              <span className="text-primary font-bold text-2xl">Food</span>
              <span className="text-slate-900 dark:text-slate-100 font-bold text-2xl">Safe</span>
              <span className="text-primary font-bold text-2xl ml-1">AI</span>
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
            {isLoggedIn && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-3 h-12 px-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{userProfile.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{scannedCount} products scanned</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 w-64" align="end">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <img 
                        src={userProfile.avatar} 
                        alt={userProfile.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 dark:text-slate-100">{userProfile.name}</div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-500 dark:text-slate-400">{userProfile.email}</span>
                          {userProfile.verified && (
                            <div className="w-2 h-2 bg-green-500 rounded-full" title="Verified" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenuItem 
                    onClick={() => setShowScanHistory(true)}
                    className="flex items-center gap-3 p-3"
                  >
                    <History className="w-4 h-4" />
                    <span>Scan History</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 p-3">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="p-3">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Products Analyzed</span>
                        <span className="text-sm font-bold text-primary">{scannedCount}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-pink-500 transition-all duration-500"
                          style={{ width: `${Math.min((scannedCount / 50) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {50 - scannedCount > 0 ? `${50 - scannedCount} more to unlock premium features` : "Premium unlocked!"}
                      </div>
                    </div>
                  </DropdownMenuItem>

                  {!userProfile.verified && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleResendVerification} className="p-3 text-yellow-600 dark:text-yellow-400">
                        <Mail className="w-4 h-4 mr-2" />
                        Verify Email Address
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-600 dark:text-red-400">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 hover:from-primary/90 hover:via-pink-500/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
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
          <div className="md:hidden mt-4 py-4 border-t border-slate-200/50 dark:border-slate-800/50">
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
              
              {isLoggedIn && userProfile ? (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{userProfile.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{userProfile.email}</div>
                      <div className="text-xs text-primary">{scannedCount} products scanned</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setShowScanHistory(true);
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <History className="w-4 h-4 mr-2" />
                    View Scan History
                  </Button>
                  
                  {!userProfile.verified && (
                    <Button 
                      onClick={() => {
                        handleResendVerification();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full text-yellow-600 border-yellow-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Verify Email
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full text-red-600 border-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    handleGoogleLogin();
                    setIsOpen(false);
                  }}
                  className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 hover:from-primary/90 hover:via-pink-500/90 hover:to-purple-600/90 text-white w-full mt-4"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
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
