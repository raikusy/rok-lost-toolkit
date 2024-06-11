"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { HexColorPicker } from "react-colorful";

export function ColorPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#000000", // Black
    "#C62828", // Red 800
    "#AD1457", // Pink 800
    "#6A1B9A", // Purple 800
    "#4527A0", // Deep Purple 800
    "#283593", // Indigo 800
    "#1565C0", // Blue 800
    "#0277BD", // Light Blue 800
    "#00838F", // Cyan 800
    "#00695C", // Teal 800
    "#2E7D32", // Green 800
    "#558B2F", // Light Green 800
    "#F9A825", // Yellow 800
    "#FF8F00", // Amber 800
    "#EF6C00", // Orange 800
    "#D84315", // Deep Orange 800
    "#4E342E", // Brown 800
    "#F44336", // Red 500
    "#E91E63", // Pink 500
    "#9C27B0", // Purple 500
    "#673AB7", // Deep Purple 500
    "#2196F3", // Blue 500
    "#00BCD4", // Cyan 500
    "#009688", // Teal 500
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal px-3 py-2 h-8",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-4 flex flex-col items-center">
        <HexColorPicker
          className="mb-4"
          color={background}
          onChange={setBackground}
        />
        <div className="flex flex-wrap gap-2 justify-between">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => setBackground(s)}
            />
          ))}
        </div>

        {/* <HexColorInput
          color={background}
          onChange={setBackground}
          className="mt-4 h-8 p-2 w-full"
        /> */}
        {/* <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  );
};
