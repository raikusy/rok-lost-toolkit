import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "../ui/slider";

const FontsizeDropdown = ({
  fontSize,
  setFontsize,
}: {
  fontSize: number;
  setFontsize: (v: number[]) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn-secondary">
        Font size: {fontSize}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="p-4 w-[300px]">
        <Slider
          defaultValue={[12]}
          value={[fontSize]}
          onValueChange={setFontsize}
          min={12}
          max={200}
          step={1}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontsizeDropdown;
