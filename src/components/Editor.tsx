import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate, ReactEditor } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  Node,
  BaseEditor,
} from "slate";
import { withHistory } from "slate-history";
import escapeHtml from "escape-html";
import { Text } from "slate";

import { Button, Icon, Toolbar } from "./Common";
import EditorToolbar from "components/editor/Toolbar";
import { Modal, useClipboard, useModal, useToasts } from "@geist-ui/react";

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

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  } as Partial<Node>;
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const ColorPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const editor = useSlate();

  const [color, setColor] = useState("#000");
  const pickColor = (color) => {
    const { selection } = editor;
    if (!selection) return false;
    Transforms.setNodes(
      editor,
      { color: color.hex },
      // Apply it to text nodes, and split the text node up if the
      // selection is overlapping only part of it.
      { match: (n) => Text.isText(n), split: true }
    );
    setColor(color.hex);
    setShowPicker(false);
  };

  return (
    <>
      <Button
        active={showPicker}
        onMouseDown={(event) => {
          event.preventDefault();
          setShowPicker(true);
        }}
      >
        <Icon>palette</Icon>
      </Button>
      {showPicker && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div style={{ position: "fixed", top: 20 }}></div>
        </div>
      )}
    </>
  );
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

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",

    children: [
      {
        text: "Hello, ",
        size: 40,
        color: "#0693e3",
      },
      {
        text: "Rise of Kingdom!",
        size: 40,
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
        text: "bold",
        bold: true,
      },
      {
        text: " and ",
      },
      {
        text: "italic",
        italic: true,
      },
      {
        text: " also ",
      },
      {
        text: "colorful ",
        color: "#eb144c",
      },
      {
        text: "text in ",
      },
      {
        text: "alliance",
        color: "#0693e3",
      },
      {
        text: " mail easily using this tool!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Created by:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Raiku - KD#2417",
        size: 30,
        color: "#9900ef",
      },
    ],
  },
] as Descendant[];

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
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

  const children = node.children.map((n) => serialize(n)).join("");
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
        <div className="min-h-full bg-white rounded shadow-lg">
          <EditorToolbar showCode={showCode} copyCode={copyCode} />
          <div className="h-full p-10 shadow-sm">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey)(event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </div>
        </div>
      </Slate>
      <Modal width="80vw" height="70vh" {...bindings}>
        <Modal.Title>Mail Code</Modal.Title>
        <Modal.Content>
          <pre style={{ height: "100%" }}>
            <code>{value?.map((v) => serialize(v))?.join("")}</code>
          </pre>
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
