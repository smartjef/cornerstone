'use client'

import { useState, useEffect, FormEvent } from 'react'
import AdminShell from '@/components/admin/admin-shell'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Hash, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Tag {
  id: string
  name: string
  slug: string
  createdAt: string
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    try {
      const res = await fetch('/api/admin/tags')
      if (!res.ok) { setLoading(false); return }
      const data = await res.json()
      setTags(Array.isArray(data) ? data : [])
    } catch { /* ignore */ } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    const res = await fetch('/api/admin/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    })
    setAdding(false)
    if (res.ok) {
      const tag = await res.json()
      setTags(prev => [...prev, tag].sort((a, b) => a.name.localeCompare(b.name)))
      setNewName('')
      toast.success(`Tag "${tag.name}" created.`)
    } else {
      const d = await res.json()
      toast.error(d.error || 'Failed to create tag.')
    }
  }

  async function handleEdit(id: string) {
    if (!editName.trim()) return
    const res = await fetch(`/api/admin/tags/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim() }),
    })
    if (res.ok) {
      const updated = await res.json()
      setTags(prev => prev.map(t => t.id === id ? updated : t).sort((a, b) => a.name.localeCompare(b.name)))
      toast.success('Tag updated.')
    } else {
      toast.error('Failed to update tag.')
    }
    setEditId(null)
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const res = await fetch(`/api/admin/tags/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleting(false)
    if (res.ok) {
      setTags(prev => prev.filter(t => t.id !== deleteTarget.id))
      toast.success(`Tag "${deleteTarget.name}" deleted.`)
    } else {
      toast.error('Failed to delete tag.')
    }
    setDeleteTarget(null)
  }

  return (
    <AdminShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tags</h1>
          <p className="text-sm text-slate-500 mt-1">Label blog posts with descriptive tags.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-none p-5">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">New Tag</Label>
          <form onSubmit={handleAdd} className="flex gap-3">
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Kenya, Youth, Healthcare…"
              className="flex-1"
            />
            <Button type="submit" disabled={adding || !newName.trim()} className="gap-2 shrink-0">
              <Plus className="w-4 h-4" />
              {adding ? 'Adding…' : 'Add'}
            </Button>
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-none overflow-hidden">
          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : tags.length === 0 ? (
            <div className="p-12 text-center">
              <Hash className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="font-medium text-slate-500">No tags yet</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tags.map(tag => (
                  <tr key={tag.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      {editId === tag.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            className="h-8 text-sm"
                            autoFocus
                            onKeyDown={e => { if (e.key === 'Enter') handleEdit(tag.id); if (e.key === 'Escape') setEditId(null) }}
                          />
                          <button onClick={() => handleEdit(tag.id)} className="p-1 text-emerald-500 hover:text-emerald-700"><Check className="w-4 h-4" /></button>
                          <button onClick={() => setEditId(null)} className="p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <span className="font-medium text-slate-900">{tag.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant="outline" className="font-mono text-[10px]">{tag.slug}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setEditId(tag.id); setEditName(tag.name) }}
                          className="p-1.5 rounded text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(tag)}
                          className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
            <DialogDescription>
              Delete &ldquo;<span className="font-semibold">{deleteTarget?.name}</span>&rdquo;? It will be removed from all posts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
