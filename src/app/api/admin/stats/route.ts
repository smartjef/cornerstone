import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [blogs, gallery, contacts, media, users] = await Promise.all([
    prisma.blog.count(),
    prisma.galleryItem.count(),
    prisma.contact.count(),
    prisma.media.count(),
    prisma.user.count(),
  ])

  return NextResponse.json({ blogs, gallery, contacts, media, users })
}
