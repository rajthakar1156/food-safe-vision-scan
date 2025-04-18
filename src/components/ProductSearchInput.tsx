
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
        <PopoverContent className="p-0 w-[--trigger-width]" align="start">
          <Command>
            <CommandInput placeholder="Search products..." />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {suggestions.map((product) => (
                <CommandItem
                  key={product}
                  value={product}
                  onSelect={(value) => {
                    onSelect(value);
                    setOpen(false);
                  }}
                >
                  {productDatabase[product]?.name || product}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductSearchInput;
