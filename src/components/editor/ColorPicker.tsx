import React, { useState } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import { BlendingModeIcon } from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { TwitterPicker } from "react-color";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 220,
  backgroundColor: "white",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",
  backgroundColor: violet.violet9,
  "&[data-disabled]": {
    color: mauve.mauve8,
    pointerEvents: "none",
  },
};

const StyledToolbarButton = styled(ToolbarPrimitive.Button, {
  ...itemStyles,
  boxShadow: 0,
  // backgroundColor: "black",
  color: "white",
  marginLeft: 2,
  paddingLeft: 5,
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuArrow = StyledArrow;
export const ColorPickerButton = StyledToolbarButton;

const defaultColors = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
  "#000000",
];

export const ColorPicker = ({ updateColor, activeColor = "#000" }) => {
  const [color, setColor] = useState(activeColor);

  const [isOpen, setIsOpen] = useState(false);

  const pickColor = (c) => {
    setColor(c?.hex);
    updateColor(c?.hex);
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
        <ColorPickerButton
          css={{
            backgroundColor: activeColor,
          }}
          asChild
        >
          <DropdownMenuTrigger>
            <BlendingModeIcon />
          </DropdownMenuTrigger>
        </ColorPickerButton>

        <DropdownMenuContent sideOffset={5}>
          <TwitterPicker
            colors={defaultColors}
            triangle="hide"
            color={color}
            onChange={pickColor}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ColorPicker;
