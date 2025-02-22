"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TiptapPreview } from "./tiptap-preview";
import { JSONContent } from "@tiptap/react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: JSONContent;
  name: string;
}

export function PreviewModal({
  isOpen,
  onClose,
  content,
  name,
}: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
