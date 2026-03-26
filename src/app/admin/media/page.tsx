'use client'

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { toast } from 'sonner'
import { Upload, Trash2, Copy, Check, HardDrive, CloudUpload, X, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface MediaFile {
  id: string
  filename: string
  url: string
  mimeType: string
  size: number
  alt: string | null
  createdAt: string
}

interface UploadItem {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_EXT = '.jpg,.jpeg,.png,.webp'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch('/api/admin/media')
    const data = await res.json()
    setMedia(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function uploadFiles(files: File[]) {
    const valid = files.filter(f => ACCEPTED.includes(f.type))
    const invalid = files.filter(f => !ACCEPTED.includes(f.type))

    if (invalid.length) {
      toast.error(`${invalid.length} file(s) skipped — only JPG, PNG, and WebP are allowed.`)
    }
    if (!valid.length) return

    const items: UploadItem[] = valid.map(f => ({ file: f, status: 'pending' }))
    setUploads(prev => [...items, ...prev])

    for (const item of items) {
      setUploads(prev => prev.map(u => u.file === item.file ? { ...u, status: 'uploading' } : u))
      try {
        const fd = new FormData()
        fd.append('file', item.file)
        const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
        if (res.ok) {
          const result: MediaFile = await res.json()
          setMedia(prev => [result, ...prev])
          setUploads(prev => prev.map(u => u.file === item.file ? { ...u, status: 'done' } : u))
          toast.success(`${item.file.name} uploaded.`)
        } else {
          const err = await res.json()
          setUploads(prev => prev.map(u => u.file === item.file ? { ...u, status: 'error', error: err.error || 'Upload failed' } : u))
          toast.error(`Failed to upload ${item.file.name}.`)
        }
      } catch {
        setUploads(prev => prev.map(u => u.file === item.file ? { ...u, status: 'error', error: 'Network error' } : u))
      }
    }

    setTimeout(() => setUploads(prev => prev.filter(u => u.status !== 'done')), 3000)
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      uploadFiles(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) uploadFiles(Array.from(e.dataTransfer.files))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteTarget.id }),
    })
    setDeleting(false)
    if (res.ok) {
      setMedia(prev => prev.filter(m => m.id !== deleteTarget.id))
      toast.success('File deleted.')
    } else {
      toast.error('Delete failed.')
    }
    setDeleteTarget(null)
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    toast.success('URL copied to clipboard.')
    setTimeout(() => setCopied(null), 2000)
  }

  const activeUploads = uploads.filter(u => u.status !== 'done')

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Media Library</h1>
            <p className="text-sm text-slate-500 mt-1">
              {media.length} file{media.length !== 1 ? 's' : ''} &mdash; JPG, PNG, WebP only
            </p>
          </div>
          <div>
            <input ref={fileInput} type="file" accept={ACCEPTED_EXT} multiple className="hidden" onChange={handleFileChange} />
            <Button onClick={() => fileInput.current?.click()} className="gap-2">
              <Upload className="w-4 h-4" /> Upload Files
            </Button>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragEnter={e => { e.preventDefault(); setDragging(true) }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInput.current?.click()}
          className={`border-2 border-dashed rounded-none p-10 text-center cursor-pointer transition-colors select-none ${dragging ? 'border-primary bg-primary/5' : 'border-slate-200 bg-slate-50 hover:border-primary hover:bg-primary/5'}`}
        >
          <CloudUpload className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragging ? 'text-primary' : 'text-slate-300'}`} />
          <p className="font-semibold text-slate-700">Drag &amp; drop images here, or click to browse</p>
          <p className="text-sm text-slate-400 mt-1">Supports JPG, JPEG, PNG, WebP &mdash; multiple files at once</p>
        </div>

        {/* Active uploads panel */}
        {activeUploads.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-none p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Uploading</p>
            {activeUploads.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center shrink-0">
                  {item.status === 'error'
                    ? <AlertCircle className="w-4 h-4 text-red-500" />
                    : <Upload className="w-4 h-4 text-primary animate-pulse" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{item.file.name}</p>
                  <p className="text-xs text-slate-400">{formatSize(item.file.size)}</p>
                  {item.error && <p className="text-xs text-red-500">{item.error}</p>}
                </div>
                <Badge variant={item.status === 'error' ? 'destructive' : 'secondary'}>
                  {item.status === 'uploading' ? 'Uploading…' : 'Error'}
                </Badge>
                <button onClick={() => setUploads(prev => prev.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-slate-700 ml-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Media grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square rounded-none" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : media.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-none p-16 text-center">
            <HardDrive className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="font-semibold text-slate-700">No media files yet</p>
            <p className="text-sm text-slate-400 mt-1">Drag and drop images or click Upload to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {media.map(file => (
              <div key={file.id} className="group bg-white border border-slate-200 rounded-none overflow-hidden hover:border-primary hover:shadow-md transition-all">
                <div className="relative aspect-square bg-slate-100">
                  <Image 
                    src={file.url} 
                    alt={file.alt || file.filename} 
                    fill 
                    className="object-cover" 
                    sizes="200px" 
                    unoptimized={file.url.includes('mauzoplus.app')} 
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => copyUrl(file.url)} title="Copy URL"
                      className="p-2 bg-white/20 backdrop-blur rounded-none text-white hover:bg-white/30 transition-colors">
                      {copied === file.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setDeleteTarget(file)} title="Delete"
                      className="p-2 bg-white/20 backdrop-blur rounded-none text-white hover:bg-red-500/80 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-slate-700 truncate" title={file.filename}>{file.filename}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{deleteTarget?.filename}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete File'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
