import {
  FaBold,
  FaItalic,
  FaLink,
  FaRedo,
  FaStrikethrough,
  FaUnlink,
  FaUndo,
} from "react-icons/fa";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect } from "react";

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="my-3 flex flex-row gap-3 border-b-2 border-black pb-2">
      <div className="flex flex-row gap-5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "rounded-full bg-gray-400" : ""}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "rounded-full bg-gray-400" : ""
          }
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={editor.isActive("link") ? "rounded-full bg-gray-400" : ""}
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <FaUnlink />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? "rounded-full bg-gray-400" : ""
          }
        >
          <FaStrikethrough />
        </button>
      </div>
      <div className="space-x-5">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

//export default MenuBar;

export const Tiptap = ({ onChange, error, formState, reset, content = "" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-500 underline" },
      }),
    ],
    content: content,

    editorProps: {
      attributes: {
        class: "outline-none h-inherit",
      },
    },

    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      if (html === "<p></p>") html = "";
      onChange(html);
    },
  });

  useEffect(
    function () {
      editor?.commands?.clearContent();
      reset();
    },
    [formState.isSubmitSuccessful, editor, reset],
  );

  return (
    <div className=" flex flex-row gap-5">
      <div className=" h-48 w-4/6 rounded-sm border-2 border-gray-400 shadow-xl">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <div className="flex items-center justify-center text-xl font-bold text-red-700">
        {error?.message}
      </div>
    </div>
  );
};
