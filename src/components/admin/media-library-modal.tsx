'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Check, Trash2, Loader2, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@radix-ui/react-label'

interface MediaItem {
  id: string
  filename: string
  url: string
  mimeType: string
  size: number
  alt: string | null
  createdAt: string
}

interface MediaLibraryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (url: string) => void
  title?: string
}

export default function MediaLibraryModal({
  open,
  onOpenChange,
  onSelect,
  title = 'Media Library',
}: MediaLibraryModalProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/media')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch {
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      fetchMedia()
    }
  }, [open, fetchMedia])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        toast.success('File uploaded')
        fetchMedia()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Upload failed')
      }
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        toast.success('Deleted')
        setItems(prev => prev.filter(item => item.id !== id))
        if (selectedId === id) setSelectedId(null)
      }
    } catch {
      toast.error('Delete failed')
    }
  }

  const filteredItems = items.filter(item =>
    item.filename.toLowerCase().includes(search.toLowerCase()) ||
    item.alt?.toLowerCase().includes(search.toLowerCase())
  )

  const selectedItem = items.find(item => item.id === selectedId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col p-0 gap-0 overflow-hidden rounded-none border-none shadow-2xl">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Select an image from the library or upload a new one.
          </DialogDescription>
        </DialogHeader>


        <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 border-b flex items-center justify-between">
            <TabsList className="h-12 bg-transparent border-b-0 gap-6 rounded-none">
              <TabsTrigger
                value="library"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0"
              >
                Media Library
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0"
              >
                Upload Files
              </TabsTrigger>
            </TabsList>

              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search media..."
                  className="pl-9 h-9 rounded-none bg-white border-slate-200 focus:ring-primary/20"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
          </div>

          <TabsContent value="library" className="flex-1 overflow-hidden m-0 p-0">
            <div className="flex h-full">
              <ScrollArea className="flex-1 p-6">
                {loading ? (
                  <div className="flex items-center justify-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-400">
                    <p>No media found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {filteredItems.map(item => (
                      <div
                        key={item.id}
                        className={`group relative aspect-square border-2 rounded-none cursor-pointer overflow-hidden transition-all ${
                          selectedId === item.id
                            ? 'border-primary ring-2 ring-primary ring-inset'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <Image
                          src={item.url}
                          alt={item.alt || item.filename}
                          fill
                          className="w-full h-full object-cover"
                          unoptimized={true}
                        />
                        {selectedId === item.id && (
                          <div className="absolute top-1 right-1 bg-primary text-white rounded-none p-0.5">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                        <button
                          onClick={e => handleDelete(item.id, e)}
                          className="absolute bottom-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Detail Sidebar */}
              <div className="w-72 border-l bg-slate-50/50 p-6 overflow-y-auto">
                {selectedItem ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Attachment Details</h3>
                    <div className="relative aspect-square rounded-none border bg-white overflow-hidden">
                      <Image
                        src={selectedItem.url}
                        alt=""
                        fill
                        className="w-full h-full object-contain"
                        unoptimized={true}
                      />
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold break-all text-slate-900">{selectedItem.filename}</p>
                      <p className="text-slate-500">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                      <p className="text-slate-500">{(selectedItem.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      <Label className="text-xs font-semibold">Alt Text</Label>
                      <Input
                        className="text-xs h-8 rounded-none border-slate-200"
                        defaultValue={selectedItem.alt || ''}
                        placeholder="Describe the image..."
                      />
                    </div>
                    <Button
                      className="w-full mt-4 rounded-none h-10 font-semibold"
                      onClick={() => {
                        onSelect(selectedItem.url)
                        onOpenChange(false)
                      }}
                    >
                      Use Image
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center text-slate-400 text-sm">
                    <p>Select an image to see details</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="flex-1 flex items-center justify-center p-6 m-0">
            <div className="max-w-md w-full border-2 border-dashed border-slate-200 rounded-none p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-none border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
              </div>
              <div>
                <p className="font-medium">Drop files to upload</p>
                <p className="text-sm text-slate-500 mt-1">or click to browse your computer</p>
              </div>
              <Input
                type="file"
                className="hidden"
                id="media-upload"
                onChange={handleUpload}
                disabled={uploading}
                accept="image/*"
              />
              <Button asChild variant="outline" disabled={uploading} className="rounded-none">
                <label htmlFor="media-upload" className="cursor-pointer">
                  {uploading ? 'Uploading...' : 'Select Files'}
                </label>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
