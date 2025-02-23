"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  CopyIcon,
  Italic,
  Redo,
  RemoveFormatting,
  Undo,
} from "lucide-react";

import { ToggleGroup, Toolbar } from "@/components/toolbar";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColorPicker } from "../color-picker";
import FontsizeDropdown from "./fontsize-dropdown";

interface EditorToolbarProps {
  editor: Editor;
  textColor: string;
  fancyCode: string;
  fontSize: number[];
  setFontSize: (v: number[]) => void;
  setTextColor: (color: string) => void;
  handleCopy: () => Promise<void>;
}

const EditorToolbar = ({
  editor,
  textColor,
  setTextColor,
  fontSize,
  setFontSize,
  handleCopy,
  fancyCode,
}: EditorToolbarProps) => {
  const handleColorChange = (color: string) => {
    setTextColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const onFontSizeChange = (v: number[]) => {
    setFontSize(v);
    editor.chain().focus().setFontSize(`${fontSize[0]}px`).run();
  };

  return (
    <Toolbar
      className="m-0 flex rounded-none items-center flex-wrap space-y-2 lg:space-y-0 justify-between p-2 bg-[#CAC9BC]"
      aria-label="Formatting options"
    >
      <ToggleGroup
        className="flex flex-row flex-wrap space-y-2 lg:space-y-0 space-x-2 items-center"
        type="multiple"
      >
        <Toggle
          size="icon"
          tooltip="Bold"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          tooltip="Italic"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .clearNodes()
                    .unsetColor()
                    .unsetAllMarks()
                    .run()
                }
                className="p-0 h-8 w-8 hover:text-accent-foreground"
                disabled={
                  !editor
                    .can()
                    .chain()
                    .focus()
                    .clearNodes()
                    .unsetColor()
                    .unsetAllMarks()
                    .run()
                }
              >
                <RemoveFormatting className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove Formatting</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Toggle
          size="icon"
          tooltip="Undo"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          tooltip="Redo"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>

        {/* <FormatType editor={editor} /> */}

        <FontsizeDropdown
          fontSize={fontSize[0]}
          setFontsize={onFontSizeChange}
        />

        <ColorPicker background={textColor} setBackground={handleColorChange} />
      </ToggleGroup>

      <div className="flex flex-row flex-wrap items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          Click to copy
        </Button>

        <Drawer>
          <DrawerTrigger className="mt-0 h-9 rounded-md px-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            Show Code
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Here&apos;s your Fancy Text Code</DrawerTitle>
              <DrawerDescription>
                Copy and paste this in game.
              </DrawerDescription>
            </DrawerHeader>
            <pre className="p-4 bg-slate-300 rounded-sm m-4 cursor-text max-h-96 overflow-scroll">
              <code>{fancyCode}</code>
            </pre>
            <DrawerFooter>
              <div className="flex flex-row space-x-2 items-center">
                <Button onClick={handleCopy}>
                  <CopyIcon className="w-4 h-4 mr-2" /> Copy
                </Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Toolbar>
  );
};

export default EditorToolbar;
