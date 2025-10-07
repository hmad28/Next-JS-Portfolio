// components/tag-selector.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { availableTechs, toolStyles } from "@/lib/tech-config";

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter tech berdasarkan search
  const filteredTechs = availableTechs.filter(
    (tech) =>
      tech.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.includes(tech)
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

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onChange([...selectedTags, trimmed]);
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label>Tags (Tools) *</Label>

      {/* Search Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search tech stack..."
        />

        {/* Dropdown */}
        {showDropdown && filteredTechs.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white :bg-gray-800 border rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredTechs.map((tech) => {
              const style = toolStyles[tech];
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTag(tech)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 :hover:bg-gray-700 flex items-center gap-2"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono ${style.bg} ${style.text}`}
                  >
                    {tech}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Tag Input */}
      <div className="flex gap-2">
        <Input
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="Or add custom tag..."
          onKeyPress={(e) =>
            e.key === "Enter" && (e.preventDefault(), addCustomTag())
          }
        />
        <Button type="button" onClick={addCustomTag} variant="outline">
          Add
        </Button>
      </div>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mt-3 p-3 border rounded-lg min-h-[60px] bg-gray-50 :bg-gray-900">
        {selectedTags.length === 0 ? (
          <span className="text-sm text-gray-400">No tags selected</span>
        ) : (
          selectedTags.map((tag) => {
            const style = toolStyles[tag] || {
              bg: "bg-gray-600/90",
              text: "text-gray-200",
            };
            return (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-mono ${style.bg} ${style.text}`}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-300 ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })
        )}
      </div>

      <p className="text-xs text-gray-500">
        {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} selected
      </p>
    </div>
  );
}
