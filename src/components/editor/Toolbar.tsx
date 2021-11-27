import React, { useState } from "react";
import { styled } from "@stitches/react";
import { violet, blackA, mauve, orange } from "@radix-ui/colors";
import {
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  FontSizeIcon,
} from "@radix-ui/react-icons";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import ColorPicker from "components/editor/ColorPicker";
import { useSlate } from "slate-react";
import { Editor, Transforms, Text, Element as SlateElement, Node } from "slate";
import { Popover, Slider, useClipboard, useToasts } from "@geist-ui/react";

const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: "flex",
  padding: 10,
  width: "100%",
  minWidth: "max-content",
  borderRadius: 6,
  backgroundColor: "white",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledFontSize = styled("div", {
  display: "flex",
  padding: "0 25px",
  width: 400,
  minWidth: "max-content",
  borderRadius: 6,
});

const itemStyles = {
  all: "unset",
  flex: "0 0 auto",
  color: mauve.mauve11,
  height: 25,
  padding: "0 5px",
  borderRadius: 4,
  display: "inline-flex",
  fontSize: 13,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { backgroundColor: violet.violet3, color: violet.violet11 },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px ${violet.violet7}` },
};

const StyledButton = styled(
  ToolbarPrimitive.Button,
  {
    ...itemStyles,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
    backgroundColor: violet.violet9,
  },
  { "&:hover": { color: "white", backgroundColor: violet.violet10 } }
);

const StyledLink = styled(
  ToolbarPrimitive.Link,
  {
    ...itemStyles,
    backgroundColor: "transparent",
    color: mauve.mauve11,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  { "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }
);

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
  width: 1,
  backgroundColor: mauve.mauve6,
  margin: "0 10px",
});

const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
  display: "inline-flex",
  borderRadius: 4,
});

const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
  ...itemStyles,
  boxShadow: 0,
  backgroundColor: "white",
  marginLeft: 2,
  "&:first-child": { marginLeft: 0 },
  "&[data-state=on]": {
    backgroundColor: violet.violet5,
    color: violet.violet11,
  },
});

// Exports
export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;

const EditorToolbar = ({ showCode, copyCode }) => {
  const editor = useSlate();

  const getActiveColor = () => {
    const activeMarks = Editor.marks(editor);
    return activeMarks?.color ?? "#000";
  };

  const isActive = (mark) => {
    const activeMarks = Editor.marks(editor);
    return activeMarks?.[mark];
  };

  const textStyles = ["bold", "italic"];

  const handleColorChange = (color) => {
    const { selection } = editor;
    if (!selection) return false;
    Transforms.setNodes(
      editor,
      { color: color },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const handleTextStyle = (style) => {
    textStyles
      .filter((ts) => !style?.includes(ts))
      .forEach((ts) => {
        if (isActive(ts)) {
          Editor.removeMark(editor, ts);
        }
      });
    style?.forEach((s) => {
      Editor.addMark(editor, s, true);
    });
  };
  const handleFontSize = (size) => {
    const { selection } = editor;
    if (!selection) return false;

    // Transforms.unwrapNodes(editor, {
    //   match: (n) =>
    //     !Editor.isEditor(n) && SlateElement.isElement(n) && n.size !== size,
    //   split: true,
    // });

    const newProperties = {
      size: size,
    } as Partial<Node>;
    Transforms.setNodes(editor, newProperties, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Text.isText(n) &&
        !!n.text.replace(/\s/g, "")?.length,
      split: true,
    });
  };

  return (
    <Toolbar aria-label="Formatting options">
      <ToolbarToggleGroup
        type="multiple"
        aria-label="Text formatting"
        onValueChange={handleTextStyle}
      >
        <ToolbarToggleItem
          data-state={isActive("bold") ? "on" : "off"}
          value="bold"
          aria-label="Bold"
        >
          <FontBoldIcon />
        </ToolbarToggleItem>
        <ToolbarToggleItem
          data-state={isActive("italic") ? "on" : "off"}
          value="italic"
          aria-label="Italic"
        >
          <FontItalicIcon />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />

      <ColorPicker
        activeColor={getActiveColor()}
        updateColor={handleColorChange}
      />
      <ToolbarSeparator />

      <Popover
        placement="right"
        content={
          <StyledFontSize>
            <Slider
              type="success"
              min={16}
              max={48}
              step={2}
              initialValue={isActive("size") || 16}
              showMarkers
              width="100%"
              onChange={handleFontSize}
            />
          </StyledFontSize>
        }
      >
        <ToolbarButton
          css={{
            backgroundColor: violet.violet6,
            color: violet.violet11,
            "&:hover": {
              backgroundColor: violet.violet8,
              color: violet.violet11,
            },
          }}
        >
          <FontSizeIcon />
        </ToolbarButton>
      </Popover>

      <ToolbarButton onClick={copyCode} css={{ marginLeft: "auto" }}>
        Copy Mail Code
      </ToolbarButton>
      <ToolbarButton
        onClick={showCode}
        css={{
          marginLeft: 5,
          backgroundColor: orange.orange9,
          "&:hover": { backgroundColor: orange.orange10 },
        }}
      >
        Show Mail Code
      </ToolbarButton>
    </Toolbar>
  );
};

export default EditorToolbar;
