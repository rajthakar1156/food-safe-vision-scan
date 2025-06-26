import { useState } from "react";
import { Menu, X, Sparkles, ChevronDown, User, Mail, LogOut, Settings, History, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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
  scanTime: string;
  riskLevel: "low" | "medium" | "high";
  image: string;
  chemicals: string[];
  nutritionalScore: number;
  timestamp: Date;
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
      setIsLoggedIn(true);
      
      const mockProfile: UserProfile = {
        email: "user@example.com",
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
        verified: true
      };
      
      setUserProfile(mockProfile);
      setScannedCount(24);
      
      const mockHistory: ScanHistory[] = [
        {
          id: "1",
          productName: "Lay's India's Magic Masala",
          brand: "Lay's",
          scanDate: "Today",
          scanTime: "2:30 PM",
          riskLevel: "medium",
          image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
          chemicals: ["MSG", "TBHQ", "Artificial Colors"],
          nutritionalScore: 65,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: "2",
          productName: "Parle-G Original Glucose Biscuits",
          brand: "Parle",
          scanDate: "Yesterday",
          scanTime: "11:45 AM",
          riskLevel: "low",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
          chemicals: ["Emulsifiers", "Raising Agents"],
          nutritionalScore: 78,
          timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000)
        },
        {
          id: "3",
          productName: "Maggi Masala Instant Noodles",
          brand: "Nestle",
          scanDate: "2 days ago",
          scanTime: "7:20 PM",
          riskLevel: "high",
          image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80",
          chemicals: ["MSG", "TBHQ", "Sodium Nitrite", "Artificial Flavors"],
          nutritionalScore: 45,
          timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000)
        },
        {
          id: "4",
          productName: "Haldiram's Aloo Bhujia",
          brand: "Haldiram",
          scanDate: "3 days ago",
          scanTime: "4:15 PM",
          riskLevel: "medium",
          image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
          chemicals: ["Artificial Colors", "Preservatives"],
          nutritionalScore: 58,
          timestamp: new Date(Date.now() - 75 * 60 * 60 * 1000)
        },
        {
          id: "5",
          productName: "Britannia Bread Pizza Base",
          brand: "Britannia",
          scanDate: "1 week ago",
          scanTime: "1:10 PM",
          riskLevel: "low",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
          chemicals: ["Modified Starch", "Preservatives"],
          nutritionalScore: 82,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (showScanHistory) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Scan History</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {scanHistory.length} products analyzed
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowScanHistory(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid gap-4 sm:gap-6">
              {scanHistory.map((scan) => (
                <div key={scan.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={scan.image} 
                        alt={scan.productName}
                        className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                            {scan.productName}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 font-medium">
                            {scan.brand}
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(scan.riskLevel)}`}>
                            {scan.riskLevel.charAt(0).toUpperCase() + scan.riskLevel.slice(1)} Risk
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>{scan.scanDate}</span>
                            <Clock className="w-4 h-4" />
                            <span>{scan.scanTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Nutritional Score */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Health Score:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                scan.nutritionalScore >= 80 ? "bg-green-500" :
                                scan.nutritionalScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${scan.nutritionalScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold ${getScoreColor(scan.nutritionalScore)}`}>
                            {scan.nutritionalScore}/100
                          </span>
                        </div>
                      </div>
                      
                      {/* Chemicals Found */}
                      <div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                          Chemicals Found:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {scan.chemicals.map((chemical, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-xs rounded-md text-slate-700 dark:text-slate-300"
                            >
                              {chemical}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
              <span className="text-primary font-bold text-xl sm:text-2xl">Food</span>
              <span className="text-slate-900 dark:text-slate-100 font-bold text-xl sm:text-2xl">Safe</span>
              <span className="text-primary font-bold text-xl sm:text-2xl ml-1">AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
                    <div className="hidden xl:flex flex-col items-start">
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
                className="relative group bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-300 h-12 px-6 font-medium rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </div>
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="lg:hidden text-slate-700 dark:text-slate-300 p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-slate-200/50 dark:border-slate-800/50">
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
                  className="relative group bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-300 w-full mt-4 h-12 rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                  </div>
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
