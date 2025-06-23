
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { productDatabase } from "@/types/chemical";
import { Trie } from "@/utils/trie";

interface ProductSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const ProductSearchInput = ({ value, onChange, onSelect }: ProductSearchInputProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const trieRef = useRef<Trie | null>(null);

  // Memoize the trie initialization to prevent recreating on every render
  const trie = useMemo(() => {
    const newTrie = new Trie();
    Object.keys(productDatabase).forEach(key => {
      newTrie.insert(key);
      // Also insert the display name if different from key
      if (productDatabase[key]?.name && productDatabase[key].name !== key) {
        newTrie.insert(productDatabase[key].name.toLowerCase());
      }
      // Insert brand names for better search
      if (productDatabase[key]?.brand) {
        newTrie.insert(productDatabase[key].brand.toLowerCase());
      }
    });
    return newTrie;
  }, []);

  // Set trie reference
  useEffect(() => {
    trieRef.current = trie;
  }, [trie]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      if (!searchValue || !trieRef.current) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      // Get suggestions using trie
      const matches = trieRef.current.findSuggestions(searchValue.toLowerCase(), 8);
      
      // Also search in product names and brands for partial matches
      const additionalMatches = Object.keys(productDatabase).filter(key => {
        const product = productDatabase[key];
        const lowerSearchValue = searchValue.toLowerCase();
        return (
          key.toLowerCase().includes(lowerSearchValue) ||
          product.name.toLowerCase().includes(lowerSearchValue) ||
          product.brand.toLowerCase().includes(lowerSearchValue)
        );
      });

      // Combine and deduplicate results
      const allMatches = [...new Set([...matches, ...additionalMatches])];
      setSuggestions(allMatches.slice(0, 6));

      // Open dropdown if we have suggestions
      setOpen(allMatches.length > 0);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const handleSelect = (product: string) => {
    onSelect(product);
    setOpen(false);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (!newValue) {
      setSuggestions([]);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id="product-name"
              placeholder="Search Indian products (e.g., Maggi, Parle-G, Lays, Haldiram)"
              value={value}
              onChange={handleInputChange}
              className="pl-10 h-12 text-base w-full"
              autoComplete="off"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px] md:w-[400px]" align="start">
          {suggestions.length > 0 ? (
            <div className="max-h-[300px] overflow-auto p-2">
              {suggestions.map((product) => {
                const productData = productDatabase[product];
                return (
                  <div
                    key={product}
                    className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer rounded-md transition-colors"
                    onClick={() => handleSelect(product)}
                  >
                    <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {productData?.name || product}
                      </div>
                      {productData?.brand && (
                        <div className="text-sm text-muted-foreground">
                          {productData.brand} • {productData.category}
                        </div>
                      )}
                    </div>
                    {productData?.riskLevel && (
                      <div 
                        className={`px-2 py-1 text-xs rounded-full ${
                          productData.riskLevel === "high" 
                            ? "bg-red-100 text-red-700" 
                            : productData.riskLevel === "medium" 
                              ? "bg-yellow-100 text-yellow-700" 
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {productData.riskLevel}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : value ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No matching products found. Try "Lays", "Parle", or "Maggi".
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default ProductSearchInput;
