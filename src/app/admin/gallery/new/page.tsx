import AdminShell from '@/components/admin/admin-shell'
import GalleryForm from '@/components/admin/gallery-form'

export default function NewGalleryPage() {
  return (
    <AdminShell>
      <GalleryForm mode="create" />
    </AdminShell>
  )
}
