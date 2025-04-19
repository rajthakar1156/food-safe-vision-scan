import { useState } from "react";
import { AlertCircle, ShieldCheck, ExternalLink, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  riskLevel: "safe" | "caution" | "danger";
  chemicals: string[];
};

const popularProducts: Product[] = [
  {
    id: 1,
    name: "Magic Masala Chips",
    brand: "Lay's",
    category: "Chips",
    image: "https://images.unsplash.com/photo-1613919113640-25632e2d5bd0?q=80&w=1470&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["Artificial Flavors", "Sodium Diacetate", "Yellow 5"]
  },
  {
    id: 2,
    name: "Cream & Onion Wafers",
    brand: "Balaji",
    category: "Chips",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1064&auto=format&fit=crop",
    riskLevel: "danger",
    chemicals: ["MSG", "TBHQ", "Red 40", "BHA"]
  },
  {
    id: 3,
    name: "Thums Up",
    brand: "Coca-Cola India",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "danger",
    chemicals: ["Phosphoric Acid", "Caramel Color", "High Fructose Corn Syrup"]
  },
  {
    id: 4,
    name: "Mango Frooti",
    brand: "Parle Agro",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["Yellow 6", "Sodium Benzoate"]
  },
  {
    id: 5,
    name: "Bourbon Biscuits",
    brand: "Britannia",
    category: "Biscuits",
    image: "https://images.unsplash.com/photo-1587940796248-6bf7c56a5e04?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["TBHQ", "Artificial Flavors"]
  },
  {
    id: 6,
    name: "Kurkure Masala Munch",
    brand: "PepsiCo India",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1599490659127-9ddf9882f935?q=80&w=1064&auto=format&fit=crop",
    riskLevel: "danger",
    chemicals: ["MSG", "Acidity Regulators", "Artificial Colors"]
  },
  {
    id: 7,
    name: "Aloo Bhujia",
    brand: "Haldiram's",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1589639832573-d3c980a0476e?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["Acidity Regulators", "Antioxidants"]
  },
  {
    id: 8,
    name: "Maggi Noodles",
    brand: "Nestlé",
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "danger",
    chemicals: ["TBHQ", "Sodium Glutamate", "Hydrolyzed Proteins"]
  },
  {
    id: 9,
    name: "Marie Gold Biscuits",
    brand: "Britannia",
    category: "Biscuits",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "safe",
    chemicals: ["Emulsifiers"]
  },
  {
    id: 10,
    name: "Cadbury Dairy Milk",
    brand: "Mondelēz International",
    category: "Chocolate",
    image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=1470&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["Emulsifiers", "Artificial Flavors"]
  },
  {
    id: 11,
    name: "Ching's Hakka Noodles",
    brand: "Capital Foods",
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1634864572872-ace433219053?q=80&w=1334&auto=format&fit=crop",
    riskLevel: "caution",
    chemicals: ["TBHQ", "Sodium Metabisulphite"]
  },
  {
    id: 12,
    name: "Amul Kool Milk",
    brand: "Amul",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop",
    riskLevel: "safe",
    chemicals: ["Stabilizers"]
  }
];

const getStarRating = (riskLevel: string, chemicals: string[]): number => {
  switch (riskLevel) {
    case "safe":
      return chemicals.length === 0 ? 5 : 4.5;
    case "caution":
      return chemicals.length <= 2 ? 4 : 3;
    case "danger":
      return chemicals.length <= 2 ? 2 : 1;
    default:
      return 3;
  }
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && (
        <Star className="h-4 w-4 fill-primary text-primary" strokeWidth={1} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory 
    ? popularProducts.filter(product => product.category === selectedCategory)
    : popularProducts;

  const categories = Array.from(new Set(popularProducts.map(product => product.category)));

  return (
    <section id="products" className="py-20 px-4 gradient-bg">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Popular Indian Products Analysis</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Explore our database of common Indian packaged food products and their chemical composition.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map(category => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="glass-card card-hover overflow-hidden">
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
                <div 
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                    product.riskLevel === "danger" 
                      ? "bg-danger/80 text-white" 
                      : product.riskLevel === "caution" 
                        ? "bg-caution/80 text-black" 
                        : "bg-safe/80 text-black"
                  }`}
                >
                  {product.riskLevel === "danger" 
                    ? "High Risk" 
                    : product.riskLevel === "caution" 
                      ? "Medium Risk" 
                      : "Low Risk"
                  }
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </div>
                </div>
                <StarRating rating={getStarRating(product.riskLevel, product.chemicals)} />
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center">
                    {product.riskLevel === "danger" ? (
                      <AlertCircle className="h-4 w-4 text-danger mr-1" />
                    ) : product.riskLevel === "caution" ? (
                      <AlertCircle className="h-4 w-4 text-caution mr-1" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-safe mr-1" />
                    )}
                    Harmful Chemicals
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.chemicals.length > 0 ? (
                      product.chemicals.map((chemical, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className={`${
                            product.riskLevel === "danger" 
                              ? "bg-danger/10 text-danger" 
                              : product.riskLevel === "caution" 
                                ? "bg-caution/10 text-caution" 
                                : "bg-safe/10 text-safe"
                          }`}
                        >
                          {chemical}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary" className="bg-safe/10 text-safe">
                        No Harmful Chemicals Detected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href="#manual-check">
                    Check Similar Products <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
