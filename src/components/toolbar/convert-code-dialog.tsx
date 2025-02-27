"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@tiptap/react";
import { parseXMLToTiptap } from "@/lib/parseTiptapJson";
import { toast } from "sonner";
import { CodeIcon } from "lucide-react";

interface ConvertCodeDialogProps {
  editor: Editor;
}

const ConvertCodeDialog = ({ editor }: ConvertCodeDialogProps) => {
  const [xmlCode, setXmlCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleConvert = () => {
    try {
      if (!xmlCode.trim()) {
        toast.error("Please enter some code to convert");
        return;
      }

      const jsonContent = parseXMLToTiptap(xmlCode);
      editor.commands.setContent(jsonContent);

      toast.success("Code converted successfully!");
      setIsOpen(false);
      setXmlCode("");
    } catch (error) {
      console.error("Error converting code:", error);
      toast.error(
        "Failed to convert code. Please check the format and try again."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CodeIcon className="h-4 w-4" />
          Convert Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Convert XML Code to Editor Content</DialogTitle>
          <DialogDescription>
            Paste your previously created fancy text code (XML format) below to
            convert it back to editor content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Paste your XML code here..."
            className="min-h-[200px] font-mono text-sm"
            value={xmlCode}
            onChange={(e) => setXmlCode(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConvert}>Start Editing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConvertCodeDialog;
