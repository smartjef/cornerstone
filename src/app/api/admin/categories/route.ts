import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name } = await request.json()
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })

  const slug = slugify(name)
  const existing = await prisma.category.findUnique({ where: { slug } })
  if (existing) return NextResponse.json({ error: 'Category already exists' }, { status: 409 })

  const category = await prisma.category.create({ data: { name, slug } })
  return NextResponse.json(category, { status: 201 })
}
