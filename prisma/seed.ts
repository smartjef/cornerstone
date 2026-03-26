import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: 'admin@cornerstone.or.ke' } })
  if (!existing) {
    const password = await bcrypt.hash('Admin@1234', 12)
    await prisma.user.create({
      data: {
        email: 'admin@cornerstone.or.ke',
        name: 'Admin',
        password,
        role: 'ADMIN',
      },
    })
    console.log('Seed: admin user created — admin@cornerstone.or.ke / Admin@1234')
  } else {
    console.log('Seed: admin user already exists')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
