import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import axios from "axios";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Highlighter,
  Table as TableIcon,
  CheckSquare,
  Palette,
  Link as LinkIcon,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files?.length) {
        try {
          const imageUrl = await uploadImageToCloudinary(input.files[0]);
          editor.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
          console.error("Erro ao enviar imagem para Cloudinary", error);
        }
      }
    };
  };

  const addLink = () => {
    const url = window.prompt("Digite a URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const MenuButton = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-700 transition-colors ${isActive ? "bg-gray-700 text-white" : "text-gray-200 hover:text-white"
        }`}
    >
      {children}
    </button>
  );

  const ColorButton = () => (
    <input
      type="color"
      onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      className="w-8 h-8 p-0 bg-transparent border-none cursor-pointer"
      title="Escolher cor"
    />
  );

  return (
    <div className="border border-gray-600 rounded-t-md p-2 bg-gray-800 flex flex-wrap gap-2">
      {/* Texto e Parágrafos */}
      <div className="flex gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={20} />
        </MenuButton>
      </div>

      <div className="w-px h-6 bg-gray-600 self-center" />

      {/* Formatação de Texto */}
      <div className="flex gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
        >
          <Highlighter size={20} />
        </MenuButton>
        <ColorButton />
      </div>

      <div className="w-px h-6 bg-gray-600 self-center" />

      {/* Scripts e Código */}
      <div className="flex gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          isActive={editor.isActive("superscript")}
        >
          <SuperscriptIcon size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          isActive={editor.isActive("subscript")}
        >
          <SubscriptIcon size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Code2 size={20} />
        </MenuButton>
      </div>

      <div className="w-px h-6 bg-gray-600 self-center" />

      {/* Alinhamento */}
      <div className="flex gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight size={20} />
        </MenuButton>
      </div>

      <div className="w-px h-6 bg-gray-600 self-center" />

      {/* Listas e Citações */}
      <div className="flex gap-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive("taskList")}
        >
          <CheckSquare size={20} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote size={20} />
        </MenuButton>
      </div>

      <div className="w-px h-6 bg-gray-600 self-center" />

      {/* Mídia e Links */}
      <div className="flex gap-2">
        <MenuButton onClick={addImage}>
          <ImageIcon size={20} />
        </MenuButton>
        <MenuButton onClick={addLink} isActive={editor.isActive("link")}>
          <LinkIcon size={20} />
        </MenuButton>
        <MenuButton onClick={addTable}>
          <TableIcon size={20} />
        </MenuButton>
      </div>
    </div>
  );
};

async function uploadImageToCloudinary(file) {
  const cloudData = new FormData();
  cloudData.append("file", file);
  cloudData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

  const response = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, cloudData);
  return response.data.secure_url;
}

const TipTapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-400 hover:text-blue-500 underline break-words",
        },
      }),
      CodeBlock,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      const rawHTML = editor.getHTML();
      const normalizedHTML = rawHTML.replace(/&nbsp;/g, " ");
      onChange(normalizedHTML);
    },
  });

  return (
    <div className="border border-gray-600 rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <div className="min-h-[360px] bg-gray-800">
        <EditorContent editor={editor} className="prose prose-invert max-w-7xl h-full" />
        <style jsx global>{`
          .ProseMirror {
            min-height: 360px;
            max-height: 600px;
            overflow-y: auto;
            padding: 1rem;
          }

          .ProseMirror:focus {
            outline: none;
          }

          .ProseMirror p.is-editor-empty:first-child::before {
            color: #666;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TipTapEditor;
