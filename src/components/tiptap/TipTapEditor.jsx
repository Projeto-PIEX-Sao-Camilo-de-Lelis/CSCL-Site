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
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
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
  Link as LinkIcon,
  Type,
  Palette,
  Maximize2,
  Minimize2,
  Square,
} from "lucide-react";
import { uploadImage } from "../../services/postService";

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
          };
        },
      },
      style: {
        default: "max-width: 100%; height: auto;",
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) {
            return {};
          }
          return {
            style: attributes.style,
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      {
        ...HTMLAttributes,
        class: "resizable-image",
        style: `${
          HTMLAttributes.style || "max-width: 100%; height: auto;"
        } border-radius: 0.5rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);`,
      },
    ];
  },
});

const MenuBar = ({ editor }) => {
  if (!editor) return null;
  const { user } = useContext(UserContext);
  const [currentColor, setCurrentColor] = useState("#FFFFFF");
  const [showImageSizeMenu, setShowImageSizeMenu] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateCurrentColor = () => {
      const color = editor.getAttributes("textStyle").color;
      if (color) {
        setCurrentColor(color);
      } else {
        setCurrentColor("#FFFFFF");
      }
    };

    editor.on("selectionUpdate", updateCurrentColor);
    editor.on("transaction", updateCurrentColor);

    return () => {
      editor.off("selectionUpdate", updateCurrentColor);
      editor.off("transaction", updateCurrentColor);
    };
  }, [editor]);

  const addImage = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpeg,image/jpg,image/png,image/gif");
    input.click();

    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        const fileType = file.type.toLowerCase();

        if (!allowedTypes.includes(fileType)) {
          alert(
            "Tipo de arquivo não permitido. Por favor, envie apenas imagens nos formatos JPG, PNG ou GIF."
          );
          return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("Arquivo muito grande. Por favor, envie uma imagem menor que 5MB.");
          return;
        }

        try {
          const imageUrl = await uploadImage(user.token, file);
          const finalUrl =
            typeof imageUrl === "string" ? imageUrl : imageUrl.url || imageUrl.imageUrl;

          editor
            .chain()
            .focus()
            .setImage({
              src: finalUrl,
              style:
                "width: 60%; max-width: 100%; height: auto; display: block; margin: 1.5rem auto;",
            })
            .run();
        } catch (error) {
          console.error("Erro ao enviar imagem:", error);

          if (error.response?.data?.message) {
            alert(`Erro: ${error.response.data.message}`);
          } else if (error.response?.status === 400) {
            alert(
              "Erro no formato do arquivo. Verifique se a imagem está nos formatos JPG, PNG ou GIF."
            );
          } else if (error.response?.status === 413) {
            alert("Arquivo muito grande. Tente uma imagem menor.");
          } else {
            alert("Ocorreu um erro ao processar a imagem. Por favor, tente novamente.");
          }
        }
      }
    };
  };

  const resizeSelectedImage = (size) => {
    const { selection } = editor.state;
    const node = selection.$from.node();

    if (node && node.type.name === "image") {
      let style = "";
      switch (size) {
        case "small":
          style = "width: 30%; max-width: 100%; height: auto; display: block; margin: 1.5rem auto;";
          break;
        case "medium":
          style = "width: 60%; max-width: 100%; height: auto; display: block; margin: 1.5rem auto;";
          break;
        case "large":
          style = "width: 90%; max-width: 100%; height: auto; display: block; margin: 1.5rem auto;";
          break;
        case "full":
          style = "width: 100%; height: auto; display: block; margin: 1.5rem auto;";
          break;
        default:
          style = "max-width: 100%; height: auto; display: block; margin: 1.5rem auto;";
      }

      editor.chain().focus().updateAttributes("image", { style }).run();
    }
    setShowImageSizeMenu(false);
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

  const MenuButton = ({ onClick, isActive, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`group relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
        isActive
          ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10"
          : "bg-zinc-700/30 text-gray-300 hover:bg-zinc-600/50 hover:text-white border border-zinc-600/30 hover:border-zinc-500/50"
      }`}
    >
      {children}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
      )}
    </button>
  );

  const ColorButton = () => (
    <div className="relative group">
      <input
        type="color"
        value={currentColor}
        onChange={(e) => {
          const newColor = e.target.value;
          setCurrentColor(newColor);
          editor.chain().focus().setColor(newColor).run();
        }}
        className="w-10 h-10 rounded-lg border border-zinc-600/30 bg-zinc-700/30 cursor-pointer hover:border-zinc-500/50 transition-all duration-300 hover:scale-105"
        title="Escolher cor do texto"
      />
      <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
    </div>
  );

  const ImageSizeDropdown = () => {
    const isImageSelected = editor.isActive("image");

    return (
      <div className="relative">
        <MenuButton
          onClick={() => setShowImageSizeMenu(!showImageSizeMenu)}
          isActive={showImageSizeMenu}
          title="Redimensionar imagem selecionada"
        >
          <Square size={18} />
        </MenuButton>

        {showImageSizeMenu && (
          <div className="absolute top-full mt-2 right-0 bg-zinc-800/95 backdrop-blur-sm border border-zinc-600/50 rounded-lg p-2 shadow-xl z-30 min-w-[200px]">
            <div className="text-xs text-gray-400 font-medium mb-2 px-2">
              {isImageSelected ? "Redimensionar imagem:" : "Selecione uma imagem primeiro"}
            </div>

            {isImageSelected && (
              <div className="space-y-1">
                <button
                  onClick={() => resizeSelectedImage("small")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700/50 rounded-md transition-colors"
                >
                  <Minimize2 size={14} />
                  Pequena (30%)
                </button>
                <button
                  onClick={() => resizeSelectedImage("medium")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700/50 rounded-md transition-colors"
                >
                  <Square size={14} />
                  Média (60%)
                </button>
                <button
                  onClick={() => resizeSelectedImage("large")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700/50 rounded-md transition-colors"
                >
                  <Maximize2 size={14} />
                  Grande (90%)
                </button>
                <button
                  onClick={() => resizeSelectedImage("full")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700/50 rounded-md transition-colors"
                >
                  <Square size={14} />
                  Largura total (100%)
                </button>
              </div>
            )}

            {!isImageSelected && (
              <div className="text-xs text-gray-500 italic px-2 py-1">
                Clique em uma imagem no editor para poder redimensioná-la
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const ToolbarSection = ({ children, label }) => (
    <div className="flex items-center gap-2 p-2 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
      <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-zinc-700/50 rounded-md hidden lg:block">
        {label}
      </span>
      <div className="flex gap-1">{children}</div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showImageSizeMenu && !event.target.closest(".relative")) {
        setShowImageSizeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showImageSizeMenu]);

  return (
    <div className="sticky top-0 z-20 bg-gradient-to-r from-zinc-800/95 to-zinc-700/95 backdrop-blur-sm border-b border-zinc-600/50 p-4">
      <div className="flex flex-wrap items-center gap-3 justify-center">
        {/* Seção de Títulos */}
        <ToolbarSection label="Títulos">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            title="Título 1"
          >
            <Heading1 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Título 2"
          >
            <Heading2 size={18} />
          </MenuButton>
        </ToolbarSection>

        {/* Seção de Formatação */}
        <ToolbarSection label="Formato">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Negrito"
          >
            <Bold size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Itálico"
          >
            <Italic size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Sublinhado"
          >
            <UnderlineIcon size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            title="Destacar"
          >
            <Highlighter size={18} />
          </MenuButton>
          <ColorButton />
        </ToolbarSection>

        {/* Seção de Scripts */}
        <ToolbarSection label="Scripts">
          <MenuButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive("superscript")}
            title="Sobrescrito"
          >
            <SuperscriptIcon size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive("subscript")}
            title="Subscrito"
          >
            <SubscriptIcon size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            title="Bloco de código"
          >
            <Code2 size={18} />
          </MenuButton>
        </ToolbarSection>

        {/* Seção de Alinhamento */}
        <ToolbarSection label="Alinhamento">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Alinhar à esquerda"
          >
            <AlignLeft size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Centralizar"
          >
            <AlignCenter size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Alinhar à direita"
          >
            <AlignRight size={18} />
          </MenuButton>
        </ToolbarSection>

        {/* Seção de Listas */}
        <ToolbarSection label="Listas">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Lista com marcadores"
          >
            <List size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Lista numerada"
          >
            <ListOrdered size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive("taskList")}
            title="Lista de tarefas"
          >
            <CheckSquare size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Citação"
          >
            <Quote size={18} />
          </MenuButton>
        </ToolbarSection>

        {/* Seção de Mídia */}
        <ToolbarSection label="Mídia">
          <MenuButton onClick={addImage} title="Inserir imagem">
            <ImageIcon size={18} />
          </MenuButton>
          <ImageSizeDropdown />
          <MenuButton onClick={addLink} isActive={editor.isActive("link")} title="Inserir link">
            <LinkIcon size={18} />
          </MenuButton>
          <MenuButton onClick={addTable} title="Inserir tabela">
            <TableIcon size={18} />
          </MenuButton>
        </ToolbarSection>
      </div>
    </div>
  );
};

const TipTapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class:
            "text-blue-400 hover:text-blue-300 underline break-words transition-colors duration-300",
        },
      }),
      CodeBlock,
      Heading.configure({
        HTMLAttributes: {
          class: "editor-heading",
        },
      }),
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
      Color.configure({
        types: ["textStyle"],
      }),
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
      if (onChange) {
        let rawHTML = editor.getHTML();

        rawHTML = rawHTML.replace(/&nbsp;/g, " ");

        rawHTML = rawHTML.replace(
          /<p(?![^>]*style.*color)([^>]*)>/g,
          '<p$1 style="color: #e5e7eb;">'
        );
        rawHTML = rawHTML.replace(
          /<h1(?![^>]*style.*color)([^>]*)>/g,
          '<h1$1 style="color: #ffffff;">'
        );
        rawHTML = rawHTML.replace(
          /<h2(?![^>]*style.*color)([^>]*)>/g,
          '<h2$1 style="color: #f3f4f6;">'
        );

        onChange(rawHTML);
      }
    },
  });

  useEffect(() => {
    if (editor) {
      editor.chain().focus().setColor("#FFFFFF").run();
    }
  }, [editor]);

  useEffect(() => {
    if (editor && content) {
      let processedContent = content;

      if (!content.includes("color:")) {
        processedContent = content
          .replace(/<p>/g, '<p style="color: #e5e7eb;">')
          .replace(/<h1>/g, '<h1 style="color: #ffffff;">')
          .replace(/<h2>/g, '<h2 style="color: #f3f4f6;">');
      }

      if (processedContent !== content) {
        editor.commands.setContent(processedContent);
      }
    }
  }, [editor, content]);

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-600/50 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 shadow-2xl">
      <MenuBar editor={editor} />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30"></div>
        <div className="relative min-h-[400px] max-h-[600px] overflow-y-auto">
          <EditorContent editor={editor} className="prose prose-lg prose-invert max-w-none" />
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          padding: 2rem;
          color: #ffffff;
          background: transparent;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.7;
          font-size: 16px;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          color: #6b7280;
          content: "Comece a escrever sua postagem aqui...";
          float: left;
          height: 0;
          pointer-events: none;
          font-style: italic;
        }

        /* Estilos para imagens redimensionáveis */
        .ProseMirror img.resizable-image {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .ProseMirror img.resizable-image:hover {
          border-color: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }

        .ProseMirror img.resizable-image.ProseMirror-selectednode {
          border-color: #ef4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
        }

        /* Garante cores consistentes para elementos */
        .ProseMirror h1:not([style*="color"]) {
          color: #ffffff !important;
        }

        .ProseMirror h2:not([style*="color"]) {
          color: #f3f4f6 !important;
        }

        .ProseMirror p:not([style*="color"]) {
          color: #e5e7eb !important;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .ProseMirror p {
          margin-bottom: 1rem;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          color: #e5e7eb;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .ProseMirror li {
          margin-bottom: 0.5rem;
          color: inherit;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #f3f4f6;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .ProseMirror pre {
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          padding: 1rem;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
          overflow-x: auto;
          margin: 1rem 0;
          color: #e5e7eb;
        }

        .ProseMirror code {
          background: #374151;
          color: #fbbf24;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
          font-size: 0.875rem;
        }

        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
          background: rgba(31, 41, 55, 0.5);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .ProseMirror th,
        .ProseMirror td {
          border: 1px solid #374151;
          padding: 0.75rem;
          text-align: left;
        }

        .ProseMirror th {
          background: #374151;
          font-weight: 600;
          color: #ffffff;
        }

        .ProseMirror td {
          color: #e5e7eb;
        }

        .ProseMirror mark {
          background: #fbbf24;
          color: #1f2937;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }

        .ProseMirror [data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }

        .ProseMirror [data-type="taskItem"] {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .ProseMirror [data-type="taskItem"] input {
          margin-right: 0.5rem;
          margin-top: 0.25rem;
        }

        .ProseMirror a {
          color: #60a5fa;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.3s ease;
        }

        .ProseMirror a:hover {
          color: #93c5fd;
        }

        /* Força cores específicas para manter consistência */
        .ProseMirror [style*="color"] {
          color: inherit !important;
        }

        /* Scrollbar personalizada */
        .ProseMirror::-webkit-scrollbar {
          width: 8px;
        }

        .ProseMirror::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 4px;
        }

        .ProseMirror::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 4px;
        }

        .ProseMirror::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </div>
  );
};

export default TipTapEditor;
