import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { uploadToStorage, deleteFromStorage, ensureBucketPublic } from '@/lib/storage'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(media)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const alt = formData.get('alt') as string | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG, PNG, and WebP images are allowed' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filename = `${timestamp}-${safeName}`

  let url: string
  try {
    await ensureBucketPublic()
    url = await uploadToStorage(buffer, filename, file.type)
  } catch (err) {
    console.error('MinIO upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  const media = await prisma.media.create({
    data: { filename, url, mimeType: file.type, size: file.size, alt: alt || null },
  })

  return NextResponse.json(media, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await request.json()
  const media = await prisma.media.findUnique({ where: { id } })
  if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    await deleteFromStorage(media.filename)
  } catch { /* object may not exist in bucket */ }

  await prisma.media.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
