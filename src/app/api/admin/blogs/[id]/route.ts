import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: true },
  })
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(blog)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { title, slug, content, excerpt, featuredImage, categoryId, tagIds, status } = body

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      featuredImage: featuredImage || null,
      categoryId: categoryId || null,
      tags: { set: tagIds?.length ? tagIds.map((tid: string) => ({ id: tid })) : [] },
      status,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
    include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: true },
  })
  return NextResponse.json(blog)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.blog.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
