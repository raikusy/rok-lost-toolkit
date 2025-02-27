"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontSize } from "@/lib/font-size";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";

interface TiptapPreviewProps {
  content: JSONContent;
  className?: string;
}

export const TiptapPreview = ({
  content,
  className = "",
}: TiptapPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none w-full",
      },
    },
  });

  useEffect(() => {
    if (editor && previewRef.current && isGenerating) {
      // Small delay to ensure content is fully rendered
      const timeoutId = setTimeout(() => {
        html2canvas(previewRef.current!, {
          backgroundColor: "#F1E3C3",
          scale: 2, // Higher quality
          logging: false,
          width: previewRef.current!.offsetWidth,
          height: previewRef.current!.scrollHeight,
        }).then((canvas) => {
          setScreenshot(canvas.toDataURL());
          setIsGenerating(false);
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [editor, isGenerating]);

  if (!editor) return null;

  if (screenshot) {
    return (
      <div
        className={`relative px-4 w-full h-[200px] overflow-hidden ${className}`}
      >
        <Image
          src={screenshot}
          alt="Template Preview"
          className="object-cover w-full"
          width={600}
          height={200}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F1E3C3] dark:from-gray-800 to-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={previewRef}
      className={`w-full ${className}`}
      style={{
        position: "fixed",
        left: "-9999px",
        top: 0,
        width: "600px", // Fixed width for consistent previews
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
