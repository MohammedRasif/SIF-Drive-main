"use client";

import type React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  type Descendant,
  Editor,
  Transforms,
  Element as SlateElement,
  Text,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  type ReactEditor,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaChevronDown,
} from "react-icons/fa";

// Types
type CustomElement = {
  type: "paragraph";
  align?: "left" | "center" | "right";
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  fontSize?: number;
  color?: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Helper functions
const TEXT_ALIGN_TYPES = ["left", "center", "right"];

const isBlockActive = (editor: Editor, format: string, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof CustomElement] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format: keyof CustomText) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format, "align");

  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as "left" | "center" | "right"),
    };
  }

  Transforms.setNodes<CustomElement>(editor, newProperties);
};

const toggleMark = (editor: Editor, format: keyof CustomText) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Components
const Element = ({ attributes, children, element }: any) => {
  const style: React.CSSProperties = { textAlign: element.align };

  return (
    <p style={style} {...attributes}>
      {children}
    </p>
  );
};

const Leaf = ({ attributes, children, leaf }: any) => {
  const style: React.CSSProperties = {};

  if (leaf.fontSize) {
    style.fontSize = `${leaf.fontSize}px`;
  }

  if (leaf.color) {
    style.color = leaf.color;
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

const BlockButton = ({
  format,
  icon: Icon,
}: {
  format: string;
  icon: React.ComponentType<any>;
}) => {
  const editor = useSlate();
  return (
    <button
      className={`p-2 rounded hover:bg-blue-700 transition-colors ${
        isBlockActive(editor, format, "align")
          ? "bg-blue-700 text-white"
          : "text-blue-100"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

const MarkButton = ({
  format,
  icon: Icon,
}: {
  format: keyof CustomText;
  icon: React.ComponentType<any>;
}) => {
  const editor = useSlate();
  return (
    <button
      className={`p-2 rounded hover:bg-blue-700 transition-colors ${
        isMarkActive(editor, format)
          ? "bg-blue-700 text-white"
          : "text-blue-100"
      }`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

const FontSizeSelector = () => {
  const editor = useSlate();
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    Editor.addMark(editor, "fontSize", size);
  };

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-blue-100 hover:bg-blue-700 rounded transition-colors">
        <span className="text-sm font-medium">{fontSize}</span>
        <FaChevronDown className="w-3 h-3" />
      </button>
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="py-1">
          {fontSizes.map((size) => (
            <button
              key={size}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                handleFontSizeChange(size);
              }}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ColorPicker = () => {
  const editor = useSlate();
  const [currentColor, setCurrentColor] = useState("#000000");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setCurrentColor(color);
    Editor.addMark(editor, "color", color);
  };

  return (
    <div className="relative">
      <input
        type="color"
        value={currentColor}
        onChange={handleColorChange}
        className="w-8 h-8 rounded border-2 border-blue-100 hover:border-white transition-colors cursor-pointer bg-transparent"
        title="Choose text color"
      />
    </div>
  );
};

const Toolbar = () => {
  return (
    <div className="flex items-center flex-wrap gap-1 p-3 bg-blue-800 border-b border-blue-700">
      <FontSizeSelector />
      <div className="w-px h-6 bg-blue-600 mx-2" />
      <ColorPicker />
      <div className="w-px h-6 bg-blue-600 mx-2" />
      <MarkButton format="bold" icon={FaBold} />
      <MarkButton format="italic" icon={FaItalic} />
      <MarkButton format="underline" icon={FaUnderline} />
      <MarkButton format="strikethrough" icon={FaStrikethrough} />
      <div className="w-px h-6 bg-blue-600 mx-2" />
      <BlockButton format="left" icon={FaAlignLeft} />
      <BlockButton format="center" icon={FaAlignCenter} />
      <BlockButton format="right" icon={FaAlignRight} />
    </div>
  );
};

const RichTextEditor = ({
  onChange,
}: {
  onChange?: (markdown: string) => void;
}) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [
        {
          text: "",
          fontSize: 16,
        },
      ],
    },
  ];

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);

    if (onChange) {
      // Convert directly to markdown
      const markdown = serializeToMarkdown(newValue);
      onChange(markdown);
    }
  };

  // Handle keyboard shortcuts including Enter for line breaks
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Insert a new paragraph
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
    }
  };

  // Convert to markdown with proper line breaks
  const serializeToMarkdown = (nodes: Descendant[]): string => {
    return nodes
      .map((node) => {
        if (Text.isText(node)) {
          let text = node.text;

          // Apply markdown formatting
          if (node.bold) text = `**${text}**`;
          if (node.italic) text = `*${text}*`;
          if (node.strikethrough) text = `~~${text}~~`;

          // For underline, color, and fontSize, we'll use HTML since markdown doesn't support them
          if (
            node.underline ||
            node.color ||
            (node.fontSize && node.fontSize !== 16)
          ) {
            let htmlStyle = "";
            const styles = [];

            if (node.underline) styles.push("text-decoration: underline");
            if (node.color) styles.push(`color: ${node.color}`);
            if (node.fontSize && node.fontSize !== 16)
              styles.push(`font-size: ${node.fontSize}px`);

            if (styles.length > 0) {
              htmlStyle = ` style="${styles.join("; ")}"`;
              text = `<span${htmlStyle}>${text}</span>`;
            }
          }

          return text;
        }

        const children = serializeToMarkdown(node.children);

        // Handle alignment with HTML div tags
        if (node.align && node.align !== "left") {
          return `<div style="text-align: ${node.align}">${children}</div>`;
        }

        return children;
      })
      .join("\n\n") // Add double line breaks between paragraphs for proper markdown formatting
      .trim();
  };

  return (
    <div className="border relative h-full border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      <Slate editor={editor} initialValue={value} onValueChange={handleChange}>
        <Toolbar />
        <div className="p-4 min-h-[400px] h-full">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing..."
            className="outline-none min-h-[350px] max-h-[500px] leading-relaxed overflow-y-auto"
            spellCheck
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </div>
      </Slate>
    </div>
  );
};

export default RichTextEditor;
