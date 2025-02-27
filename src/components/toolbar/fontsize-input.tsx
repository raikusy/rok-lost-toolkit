import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FontSizeInputProps {
  fontSize: number;
  setFontSize: (value: number[]) => void;
  className?: string;
}

const FontSizeInput = ({
  fontSize,
  setFontSize,
  className,
}: FontSizeInputProps) => {
  const MIN_FONT_SIZE = 8;
  const MAX_FONT_SIZE = 200;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      // Clamp the value between MIN_FONT_SIZE and MAX_FONT_SIZE
      const clampedValue = Math.min(
        Math.max(value, MIN_FONT_SIZE),
        MAX_FONT_SIZE
      );
      setFontSize([clampedValue]);
    }
  };

  const incrementFontSize = () => {
    const newSize = Math.min(fontSize + 1, MAX_FONT_SIZE);
    setFontSize([newSize]);
  };

  const decrementFontSize = () => {
    const newSize = Math.max(fontSize - 1, MIN_FONT_SIZE);
    setFontSize([newSize]);
  };

  return (
    <div
      className={cn(
        "flex items-center bg-white rounded-md border border-input overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        className="flex items-center justify-center h-8 w-8 border-r border-input hover:bg-muted transition-colors"
        onClick={decrementFontSize}
        disabled={fontSize <= MIN_FONT_SIZE}
        aria-label="Decrease font size"
      >
        <Minus className="h-4 w-4" />
      </button>

      <Input
        type="number"
        value={fontSize}
        onChange={handleInputChange}
        className="h-8 w-12 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
        min={MIN_FONT_SIZE}
        max={MAX_FONT_SIZE}
        aria-label="Font size"
      />

      <button
        type="button"
        className="flex items-center justify-center h-8 w-8 border-l border-input hover:bg-muted transition-colors"
        onClick={incrementFontSize}
        disabled={fontSize >= MAX_FONT_SIZE}
        aria-label="Increase font size"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FontSizeInput;
