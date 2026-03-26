import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: { category: true, tags: true, author: { select: { name: true } } },
  })
  return NextResponse.json(blogs)
}
