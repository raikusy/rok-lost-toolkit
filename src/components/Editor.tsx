import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { Editor, createEditor, Descendant, BaseEditor } from "slate";
import { withHistory } from "slate-history";
import { Text } from "slate";
import EditorToolbar from "components/editor/Toolbar";
import {
  Modal,
  Note,
  useClipboard,
  useModal,
  useToasts,
} from "@geist-ui/react";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

type CustomElement = {
  type: "paragraph";
  size?: number;
  children: CustomText[];
};
type CustomText = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  size?: number;
};
declare module "slate" {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Element = ({ attributes, children, element }) => {
  return (
    <p style={{ fontSize: element.size, color: element.color }} {...attributes}>
      {children}
    </p>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }

  if (leaf.size && leaf.size > 16) {
    children = <span style={{ fontSize: leaf.size }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "paragraph",

    children: [
      {
        text: "          Hello, ",
        bold: true,
        size: 40,
        color: "#0693e3",
      },
      {
        text: "Mighty Governors of ",
        size: 40,
        bold: true,
        color: "#9900ef",
      },
      {
        text: "Rise of Kingdoms!",
        bold: true,
        size: 48,
        color: "#ff6900",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "You can write ",
      },
      {
        text: "BOLD",
        bold: true,
      },
      {
        text: " and ",
      },
      {
        text: "ITALIC",
        italic: true,
      },
      {
        text: " also ",
      },
      {
        text: "COLORFUL ",
        color: "#eb144c",
      },
      {
        text: "text in ",
      },
      {
        text: "alliance",
        bold: true,
        color: "#0693e3",
      },
      {
        text: " mail for your next Alliance Event update or Kingdom Announcement or War strategy changes.",
      },
      {
        text: "Now you can send fancy colorful creative mails to your Kingdom and standout from the crowd!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "SHARE THIS WITH PLAYERS AROUND YOU 🫰 I APPRECIATE THE SUPPORT THANKS!",
        bold: true,
        size: 18,
        color: "#000",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "                                        Developed by:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "MD RAKIBUL HASAN 🫰 RaikuGG",
        size: 28,
        bold: true,
        color: "#9900ef",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "                         🇧🇩 Software Developer 🇸🇦",
        size: 20,
      },
    ],
  },
] as Descendant[];

const serialize = (node: any) => {
  if (Text.isText(node)) {
    if (node.text?.trim()) {
      let string: string = node.text;
      if (node.bold) {
        string = `<b>${string}</b>`;
      }
      if (node.italic) {
        string = `<i>${string}</i>`;
      }
      if (node.color) {
        string = `<color=${node.color}>${string}</color>`;
      }
      if (node.size && node.size > 16) {
        string = `<size=${node.size}>${string}</size>`;
      }
      return `${string}`;
    }
  }

  const children = node?.children
    ? node?.children?.map((n: any) => serialize(n)).join("")
    : "";
  return `${children}\n`;
};

const RichTextEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [, setToast] = useToasts();
  const { copy } = useClipboard();
  const { setVisible, bindings } = useModal();
  const showCode = () => {
    setVisible(true);
  };
  const copyCode = () => {
    copy(value?.map((v) => serialize(v)).join(""));
    setToast({ text: "Text copied.", type: "success" });
  };

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <div className="min-h-full bg-white rounded shadow-lg mail-bg">
          <EditorToolbar showCode={showCode} copyCode={copyCode} />
          <div className="h-full p-8 shadow-sm">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              className="font-body"
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey)(event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
                // console.log(event.code);
                // Reset the formatting when 'Enter' is pressed
                if (event.code === "Enter") {
                  // event.preventDefault();
                  Editor.removeMark(editor, "bold");
                  Editor.removeMark(editor, "italic");
                  Editor.removeMark(editor, "size");
                  Editor.removeMark(editor, "color");
                }
              }}
            />
          </div>
        </div>
      </Slate>
      <Modal width="80vw" height="70vh" {...bindings}>
        <Modal.Title>Mail Code</Modal.Title>
        <Modal.Content>
          <pre style={{ height: "100%" }} className="font-mono">
            <code>{value?.map((v) => serialize(v))?.join("")}</code>
          </pre>
          <Note type="success">
            Copy this code and paste it in game mail editor and send.
          </Note>
        </Modal.Content>

        <Modal.Action passive onClick={() => setVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action onClick={copyCode}>Copy Code</Modal.Action>
      </Modal>
    </>
  );
};

export default RichTextEditor;
