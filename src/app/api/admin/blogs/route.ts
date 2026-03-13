import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, email: true } },
      category: true,
      tags: true,
    },
  })
  return NextResponse.json(blogs)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, slug, content, excerpt, featuredImage, categoryId, tagIds, status } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'title, slug, and content are required' }, { status: 400 })
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      featuredImage: featuredImage || null,
      categoryId: categoryId || null,
      tags: tagIds?.length ? { connect: tagIds.map((id: string) => ({ id })) } : undefined,
      status: status || 'DRAFT',
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
      authorId: session.userId,
    },
    include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: true },
  })

  return NextResponse.json(blog, { status: 201 })
}
