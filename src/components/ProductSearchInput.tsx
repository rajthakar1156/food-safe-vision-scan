
import React, { useState, useEffect, useRef } from "react";
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

  // Initialize trie with product database
  useEffect(() => {
    const trie = new Trie();
    Object.keys(productDatabase).forEach(key => {
      trie.insert(key);
      // Also insert the display name if different from key
      if (productDatabase[key]?.name && productDatabase[key].name !== key) {
        trie.insert(productDatabase[key].name);
      }
    });
    trieRef.current = trie;
  }, []);

  useEffect(() => {
    if (!value || !trieRef.current) {
      setSuggestions([]);
      return;
    }

    // Get suggestions using trie with improved matching
    const matches = trieRef.current.findSuggestions(value, 12); // Increased number of suggestions
    const uniqueMatches = Array.from(new Set(matches));
    setSuggestions(uniqueMatches);

    // Open dropdown if we have suggestions
    if (uniqueMatches.length > 0) {
      setOpen(true);
    }
  }, [value]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id="product-name"
              placeholder="Search Indian products (e.g., Maggi, Parle-G, Haldiram's)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10 h-12 text-base w-full"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px] md:w-[400px]" align="start">
          {suggestions.length > 0 ? (
            <div className="max-h-[300px] overflow-auto p-2">
              {suggestions.map((product) => (
                <div
                  key={product}
                  className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer rounded-md"
                  onClick={() => {
                    onSelect(product);
                    setOpen(false);
                  }}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">
                      {productDatabase[product]?.name || product}
                    </div>
                    {productDatabase[product]?.brand && (
                      <div className="text-sm text-muted-foreground">
                        {productDatabase[product].brand}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No matching products found. Try a different search term.
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductSearchInput;
