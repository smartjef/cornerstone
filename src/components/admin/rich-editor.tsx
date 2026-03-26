'use client'

import { useEffect, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  tooltip: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, isActive, disabled, tooltip, children }: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            onClick()
          }}
          disabled={disabled}
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded text-sm transition-colors shrink-0',
            isActive
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />
}

export default function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-2 cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your content…',
        emptyEditorClass: 'is-editor-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[320px] px-5 py-4',
      },
    },
  })

  // Sync external value changes (e.g. on initial load for edit mode)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  const handleSetLink = useCallback(() => {
    if (!editor) return
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}` })
        .run()
    }
    setLinkUrl('')
    setLinkDialogOpen(false)
  }, [editor, linkUrl])

  const openLinkDialog = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href || ''
    setLinkUrl(previousUrl)
    setLinkDialogOpen(true)
  }, [editor])

  if (!editor) return null

  return (
    <TooltipProvider delayDuration={400}>
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-slate-200 bg-slate-50">
          {/* History */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            tooltip="Undo"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            tooltip="Redo"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            tooltip="Underline"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            tooltip="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            tooltip="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            tooltip="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            tooltip="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            tooltip="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            tooltip="Ordered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Block elements */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            tooltip="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            tooltip="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Text alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarButton>

          <ToolbarDivider />

          {/* Link */}
          <ToolbarButton
            onClick={openLinkDialog}
            isActive={editor.isActive('link')}
            tooltip="Insert Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </ToolbarButton>
        </div>

        {/* Link dialog */}
        {linkDialogOpen && (
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); handleSetLink() }
                if (e.key === 'Escape') { setLinkDialogOpen(false); setLinkUrl('') }
              }}
              placeholder="https://example.com"
              autoFocus
              className="flex-1 text-sm px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            />
            <button
              type="button"
              onClick={handleSetLink}
              className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              {linkUrl ? 'Set Link' : 'Remove'}
            </button>
            <button
              type="button"
              onClick={() => { setLinkDialogOpen(false); setLinkUrl('') }}
              className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Editor content */}
        <EditorContent
          editor={editor}
          className="rich-editor-content"
        />
      </div>

      {/* Prose styles for editor content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .rich-editor-content .ProseMirror {
          outline: none;
          min-height: 320px;
          padding: 1rem 1.25rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #0f172a;
        }
        .rich-editor-content .ProseMirror h1 {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.25;
          margin: 1.5rem 0 0.75rem;
          color: #0f172a;
        }
        .rich-editor-content .ProseMirror h2 {
          font-size: 1.375rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 1.25rem 0 0.625rem;
          color: #0f172a;
        }
        .rich-editor-content .ProseMirror h3 {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 1rem 0 0.5rem;
          color: #0f172a;
        }
        .rich-editor-content .ProseMirror p {
          margin: 0.625rem 0;
        }
        .rich-editor-content .ProseMirror ul,
        .rich-editor-content .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        .rich-editor-content .ProseMirror ul { list-style-type: disc; }
        .rich-editor-content .ProseMirror ol { list-style-type: decimal; }
        .rich-editor-content .ProseMirror li { margin: 0.25rem 0; }
        .rich-editor-content .ProseMirror blockquote {
          border-left: 3px solid #e2e8f0;
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          color: #64748b;
          font-style: italic;
          background: #f8fafc;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        .rich-editor-content .ProseMirror code {
          background: #f1f5f9;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875em;
          color: #dc2626;
        }
        .rich-editor-content .ProseMirror pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .rich-editor-content .ProseMirror pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
        }
        .rich-editor-content .ProseMirror strong { font-weight: 600; }
        .rich-editor-content .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .rich-editor-content .ProseMirror hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 1.5rem 0;
        }
        .rich-editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
        }
      ` }} />
    </TooltipProvider>
  )
}
