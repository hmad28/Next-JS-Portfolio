// components/category-selector.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { availableCategories, categoryStyles } from "@/lib/category-config";

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function CategorySelector({
  selectedCategory,
  onChange,
}: CategorySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter categories berdasarkan search
  const filteredCategories = availableCategories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCategory = (category: string) => {
    onChange(category);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const clearCategory = () => {
    onChange("");
    setSearchQuery("");
  };

  return (
    <div className="space-y-2">
      <Label>Category *</Label>

      {/* Input dengan selected category atau search */}
      <div className="relative">
        {selectedCategory ? (
          // Show selected category
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white :bg-gray-900">
            <span
              className={`text-sm font-medium tracking-widest uppercase flex-1 ${
                categoryStyles[selectedCategory]?.text || "text-gray-500"
              }`}
            >
              {selectedCategory}
            </span>
            <button
              type="button"
              onClick={clearCategory}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          // Show search input
          <>
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search category..."
            />

            {/* Dropdown */}
            {showDropdown && filteredCategories.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-1 bg-white :bg-gray-800 border rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                {filteredCategories.map((category) => {
                  const style = categoryStyles[category];
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => selectCategory(category)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 :hover:bg-gray-700 flex items-center gap-2"
                    >
                      <span
                        className={`text-sm font-medium tracking-widest uppercase ${style.text}`}
                      >
                        {category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
