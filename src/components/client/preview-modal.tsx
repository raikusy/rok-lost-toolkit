"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TiptapPreview } from "./tiptap-preview";
import { JSONContent } from "@tiptap/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye } from "lucide-react";

interface PreviewModalProps {
  content: JSONContent;
  name: string;
}

export function PreviewModal({ content, name }: PreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Preview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="bg-[#F1E3C3] dark:bg-gray-800 rounded-lg">
            <TiptapPreview content={content} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
