import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const members = await prisma.user.findMany({
    where: { 
      isPublic: true,
      teamType: { not: null }
    },
    orderBy: [{ teamType: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  })

  return NextResponse.json(members)
}
