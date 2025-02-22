import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { convertTiptapToXML } from "@/lib/parseTiptapJson";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { User } from "lucia";
import { FancyText } from "@/db/schema";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { PAGES } from "@/config/pages";
import CreateDialog from "./toolbar/create-dialog";
import UpdateDialog from "./toolbar/update-dialog";
import Link from "next/link";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { toggleFancyTextPublic } from "@/server/actions/fancy-text.action";
import DeleteDialog from "./toolbar/delete-dialog";
import DuplicateDialog from "./toolbar/duplicate-dialog";
import { FontSize } from "@/lib/font-size";
import { Confetti } from "./magicui/confetti";

interface EditorProps {
  mode: "create" | "edit" | "view";
  user?: User | null;
  content: JSONContent;
  placeholder?: string;
  template?: FancyText;
  onChange: (value: JSONContent) => void;
}

const Editor = ({
  mode,
  user,
  content,
  placeholder,
  onChange,
  template,
}: EditorProps) => {
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState([12]);
  const router = useRouter();
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: content,
    editorProps: {
      attributes: {
        class: "max-w-full prose p-2 flex-1 w-full",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    onSelectionUpdate: ({ editor }) => {
      const c = editor.getAttributes("textStyle").color ?? "#000000";
      const s = editor.getAttributes("textStyle").fontSize ?? "12px";
      setFontSize([parseInt(s)]);
      setColor(c);
    },
  });
  // const fancyCode = editor ? JSON.stringify(editor.getJSON(), null, 2) : "";
  const fancyCode = editor ? convertTiptapToXML(editor.getJSON()) : "";

  const handleCopy = async () => {
    Confetti({});
    const code = editor ? convertTiptapToXML(editor.getJSON()) : "";
    // const code = editor ? JSON.stringify(editor.getJSON()) : "";
    const promise = navigator.clipboard.writeText(code);
    toast.promise(promise, {
      loading: "Loading...",
      success: (_data) => {
        return `Fancy Text Copied!`;
      },
      error: "Error",
    });
  };

  const [isPending, startTransition] = useTransition();

  const [isPublic, setIsPublic] = useState(template?.isPublic ?? false);

  const handlePublicChange = async (isPublic: boolean) => {
    startTransition(async () => {
      if (template) {
        await toggleFancyTextPublic(template.id, isPublic);
        setIsPublic(isPublic);
      }
    });
  };

  if (!editor) return <></>;

  return (
    <div className="w-full">
      {template && (
        <h3 className="text-4xl mb-4 font-bold dark:text-white text-center">
          {mode === "edit" && "Editing: "}
          {template.name}
        </h3>
      )}

      <div className="w-full flex flex-row flex-wrap space-y-2 lg:space-y-0 items-center space-x-2 justify-between mb-4">
        <Button onClick={router.back}>
          <CircleArrowLeft className="w-6 h-6 mr-2" /> Go back
        </Button>
        <div className="inline-flex space-x-2">
          {mode === "create" &&
            (user ? (
              <CreateDialog editor={editor} />
            ) : (
              <Link href={PAGES.LOGIN}>
                <Button>Login to Save</Button>
              </Link>
            ))}

          {mode === "edit" && (
            <UpdateDialog template={template} editor={editor} />
          )}

          {mode === "view" && (
            <>
              {user && user.id === template?.userId && (
                <>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isPublic}
                      id="isPublic"
                      onCheckedChange={handlePublicChange}
                      disabled={isPending}
                    />
                    <Label htmlFor="isPublic">Make Public?</Label>
                  </div>
                  <Link href={PAGES.EDIT_TEMPLATE(template.id)}>
                    <Button size="sm" variant="default">
                      Edit
                    </Button>
                  </Link>
                  <DeleteDialog template={template} />
                </>
              )}

              {user && <DuplicateDialog template={template} />}
            </>
          )}
        </div>
      </div>

      <div className="max-w-none w-full border border-input dark:prose-invert mb-4 rounded-lg overflow-hidden">
        <EditorToolbar
          editor={editor}
          textColor={color}
          setTextColor={setColor}
          fontSize={fontSize}
          setFontSize={setFontSize}
          handleCopy={handleCopy}
          fancyCode={fancyCode}
        />
        <div
          id="rok-editor"
          className="editor flex min-h-[300px] w-full bg-[#F1E3C3]"
        >
          <EditorContent
            className="flex flex-1 flex-col w-full max-w-full"
            editor={editor}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
