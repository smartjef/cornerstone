'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Save,
  Send,
  ChevronsUpDown,
  Check,
  X,
  ChevronDown,
  Tag as TagIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import RichEditor from '@/components/admin/rich-editor'
import { cn } from '@/lib/utils'
import MediaLibraryModal from '@/components/admin/media-library-modal'
import { ImagePlus, Plus } from 'lucide-react'

interface BlogData {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  categoryId: string
  tags: Array<{ id: string; name: string }>
  status: 'DRAFT' | 'PUBLISHED'
}

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

interface Props {
  initial?: BlogData & { id?: string }
  mode: 'create' | 'edit'
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogForm({ initial, mode }: Props) {
  const router = useRouter()

  const [title, setTitle] = useState(initial?.title || '')
  const [slug, setSlug] = useState(initial?.slug || '')
  const [content, setContent] = useState(initial?.content || '')
  const [excerpt, setExcerpt] = useState(initial?.excerpt || '')
  const [featuredImage, setFeaturedImage] = useState(initial?.featuredImage || '')
  const [categoryId, setCategoryId] = useState(initial?.categoryId || '')
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initial?.tags || [])

  const [categories, setCategories] = useState<Category[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [saving, setSaving] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [tagDropOpen, setTagDropOpen] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)

  const slugManuallyEdited = useRef(mode === 'edit')

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(d => setCategories(Array.isArray(d) ? d : []))
      .catch(() => {})

    fetch('/api/admin/tags')
      .then(r => r.json())
      .then(d => setAllTags(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (!slugManuallyEdited.current && title) {
      setSlug(slugify(title))
    }
  }, [title])

  const toggleTag = useCallback((tag: Tag) => {
    setSelectedTags(prev => {
      const exists = prev.some(t => t.id === tag.id)
      return exists ? prev.filter(t => t.id !== tag.id) : [...prev, tag]
    })
  }, [])

  const removeTag = useCallback((tagId: string) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tagId))
  }, [])

  const selectedCategory = categories.find(c => c.id === categoryId)

  async function save(publishStatus: 'DRAFT' | 'PUBLISHED') {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!slug.trim()) {
      toast.error('Slug is required')
      return
    }

    setSaving(true)
    const payload = {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      categoryId: categoryId || null,
      tagIds: selectedTags.map(t => t.id),
      status: publishStatus,
      publishedAt: publishStatus === 'PUBLISHED' ? new Date().toISOString() : null,
    }

    const url = mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initial!.id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Save failed')
      }
      toast.success(publishStatus === 'PUBLISHED' ? 'Post published!' : 'Draft saved')
      router.push('/admin/blogs')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Sticky header bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/blogs"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {mode === 'create' ? 'New Post' : 'Edit Post'}
            </p>
            <p className="text-sm font-semibold text-slate-800 truncate max-w-xs">
              {title || 'Untitled'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => save('DRAFT')}
            className="gap-1.5 text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            Save Draft
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={saving}
            onClick={() => save('PUBLISHED')}
            className="gap-1.5 text-xs bg-primary hover:bg-primary/90"
          >
            <Send className="w-3.5 h-3.5" />
            Publish
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 items-start">
        {/* Left column — main content (2/3) */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Title + slug card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div>
              <Label htmlFor="title" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter a compelling post title"
                className="mt-1.5 text-base font-medium border-slate-200 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Slug <span className="text-red-400">*</span>
              </Label>
              <div className="mt-1.5 flex items-center border border-slate-200 rounded-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors overflow-hidden">
                <span className="px-3 py-2 text-sm text-slate-400 bg-slate-50 border-r border-slate-200 shrink-0 select-none">
                  /blog/
                </span>
                <input
                  id="slug"
                  value={slug}
                  onChange={e => {
                    slugManuallyEdited.current = true
                    setSlug(e.target.value)
                  }}
                  placeholder="post-url-slug"
                  className="flex-1 px-3 py-2 text-sm font-mono text-slate-800 bg-white outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Content card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
              Content
            </Label>
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Write your post content here…"
            />
          </div>

          {/* Excerpt card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <Label htmlFor="excerpt" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Excerpt
            </Label>
            <p className="text-xs text-slate-400 mt-0.5 mb-2">
              Short summary shown in post listings and SEO descriptions.
            </p>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Write a brief summary of your post…"
              className="resize-none border-slate-200 focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Right sidebar (1/3) */}
        <div className="w-72 shrink-0 space-y-4" style={{ position: 'sticky', top: '80px' }}>

          {/* Category card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Category</h3>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  aria-controls="category-list"
                  className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-md text-sm bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <span className={selectedCategory ? 'text-slate-800' : 'text-slate-400'}>
                    {selectedCategory?.name || 'Select category…'}
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-50" align="start">
                <Command>
                  <CommandInput placeholder="Search categories…" className="h-9 text-sm" />
                  <CommandList>
                    <CommandEmpty className="text-sm text-slate-500 py-4 text-center">No categories found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="__none__"
                        onSelect={() => {
                          setCategoryId('')
                          setCategoryOpen(false)
                        }}
                        className="text-sm"
                      >
                        <span className="text-slate-400 italic">No category</span>
                        {!categoryId && <Check className="w-4 h-4 ml-auto text-primary" />}
                      </CommandItem>
                      {categories.map(cat => (
                        <CommandItem
                          key={cat.id}
                          value={cat.name}
                          onSelect={() => {
                            setCategoryId(cat.id)
                            setCategoryOpen(false)
                          }}
                          className="text-sm"
                        >
                          {cat.name}
                          {categoryId === cat.id && <Check className="w-4 h-4 ml-auto text-primary" />}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Tags card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tags</h3>

            {/* Selected tag chips */}
            <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
              {selectedTags.length === 0 ? (
                <p className="text-xs text-slate-400">No tags selected</p>
              ) : (
                selectedTags.map(tag => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="gap-1 pr-1 text-xs font-medium bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => removeTag(tag.id)}
                      className="rounded-full hover:bg-slate-300 p-0.5 transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            {/* Tag picker dropdown */}
            <Popover open={tagDropOpen} onOpenChange={setTagDropOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  <TagIcon className="w-3.5 h-3.5" />
                  Add tags
                  <ChevronDown className="w-3 h-3" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0 z-50" align="start">
                <Command>
                  <CommandInput placeholder="Search tags…" className="h-9 text-sm" />
                  <CommandList>
                    <CommandEmpty className="text-sm text-slate-500 py-4 text-center">No tags found.</CommandEmpty>
                    <CommandGroup>
                      {allTags.map(tag => {
                        const isSelected = selectedTags.some(t => t.id === tag.id)
                        return (
                          <CommandItem
                            key={tag.id}
                            value={tag.name}
                            onSelect={() => toggleTag(tag)}
                            className="text-sm"
                          >
                            <div className={cn(
                              'w-4 h-4 rounded border mr-2 flex items-center justify-center shrink-0',
                              isSelected ? 'bg-primary border-primary' : 'border-slate-300'
                            )}>
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                            {tag.name}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Featured Image card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Featured Image</h3>
            
            <div className="space-y-3">
              <div className="aspect-video rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden relative group">
                {featuredImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredImage}
                      alt="Featured image preview"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png' }}
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        type="button"
                        onClick={() => setMediaOpen(true)}
                      >
                        Change Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMediaOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 hover:text-slate-500 transition-colors"
                  >
                    <ImagePlus className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Select Image</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  className="w-full text-xs h-8"
                  onClick={() => setMediaOpen(true)}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  {featuredImage ? 'Replace' : 'Browse Library'}
                </Button>
                {featuredImage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setFeaturedImage('')}
                  >
                    Remove
                  </Button>
                )}
              </div>

              {featuredImage && (
                <Input
                  value={featuredImage}
                  readOnly
                  className="text-[10px] h-7 bg-slate-50 text-slate-400"
                />
              )}
            </div>

            <MediaLibraryModal
              open={mediaOpen}
              onOpenChange={setMediaOpen}
              onSelect={setFeaturedImage}
              title="Select Featured Image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
