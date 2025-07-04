'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';


import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  Minus,
  Heading1,
  Heading2,
  ImageIcon,
} from 'lucide-react';

import './editor.css';

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // ⛔ Disable default heading
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Heading.configure({
        levels: [1, 2],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 border p-2 rounded bg-gray-100">
        {/* Formatting */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-1 hover:bg-gray-300 rounded"><Bold size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1 hover:bg-gray-300 rounded"><Italic size={16} /></button>

        {/* Headings */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="p-1 hover:bg-gray-300 rounded"><Heading1 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="p-1 hover:bg-gray-300 rounded"><Heading2 size={16} /></button>

        {/* Lists */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-1 hover:bg-gray-300 rounded"><List size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-1 hover:bg-gray-300 rounded"><ListOrdered size={16} /></button>

        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-1 hover:bg-gray-300 rounded"><AlignLeft size={16} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-1 hover:bg-gray-300 rounded"><AlignCenter size={16} /></button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="p-1 hover:bg-gray-300 rounded"><AlignRight size={16} /></button>

        {/* Blockquote */}
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="p-1 hover:bg-gray-300 rounded"><Quote size={16} /></button>

        {/* Code block */}
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="p-1 hover:bg-gray-300 rounded"><Code size={16} /></button>

        {/* Horizontal rule */}
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-1 hover:bg-gray-300 rounded"><Minus size={16} /></button>

        {/* Image */}
        <button onClick={addImage} className="p-1 hover:bg-gray-300 rounded"><ImageIcon size={16} /></button>
      </div>

      <EditorContent editor={editor} className="prose max-w-none border p-3 rounded bg-white" />
    </div>
  );
}
