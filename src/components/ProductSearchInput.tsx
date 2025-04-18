
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { productDatabase } from "@/types/chemical";

interface ProductSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const ProductSearchInput = ({ value, onChange, onSelect }: ProductSearchInputProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    const normalized = value.toLowerCase().trim();
    const matches = Object.keys(productDatabase).filter(key => 
      key.includes(normalized) || normalized.includes(key)
    );

    setSuggestions(matches);
  }, [value]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id="product-name"
              placeholder="e.g., Lay's Magic Masala, Kurkure, Maggi"
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
                  {productDatabase[product]?.name || product}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No product found.
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductSearchInput;
