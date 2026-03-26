import { PrismaClient, TeamType, BlogStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  console.log('Starting seed...')

  // 1. Create Admin User
  const password = await bcrypt.hash('Admin@1234', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cornerstone.or.ke' },
    update: {},
    create: {
      email: 'admin@cornerstone.or.ke',
      name: 'Admin',
      password,
      role: 'ADMIN',
    },
  })
  console.log('Admin user ready')

  // 2. Create Categories
  const categoryNames = ["Education", "Water", "Relief", "Humanitarian", "Leadership"]
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { 
        name, 
        slug: name.toLowerCase().replace(/ /g, '-') 
      }
    })
  }
  console.log('Categories created')

  // 3. Create Tags
  const tagNames = ["bursary", "rural", "water", "youth", "education"]
  for (const name of tagNames) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { 
        name, 
        slug: name.toLowerCase() 
      }
    })
  }
  console.log('Tags created')

  // 4. Create Team Members (Users)
  const trustees = [
    {
      slug: "julius-migos-ogamba",
      name: "Julius Migos Ogamba",
      position: "Founder",
      avatar: "/images/team/founder.jpeg",
      bio: "Steward of the foundation's strategic direction and institutional values, ensuring alignment with the core mission of serving the most vulnerable in society.",
      teamType: TeamType.BOARD
    },
    {
      slug: "job-bogonko-mongaare",
      name: "Job Bogonko Monga'are",
      position: "Trustee",
      avatar: "/images/team/placeholder.png",
      bio: "Provides governance oversight and ensures accountability across all foundation programmes, driving community impact with integrity and diligence.",
      teamType: TeamType.BOARD
    },
    {
      slug: "joshua-wabwire",
      name: "Joshua Wabwire",
      position: "Trustee",
      avatar: "/images/team/placeholder.png",
      bio: "Brings extensive experience in community development and social governance to the board, championing evidence-based approaches to humanitarian support.",
      teamType: TeamType.BOARD
    },
    {
      slug: "ronald-gitobu-mworia",
      name: "Ronald Gitobu Mworia",
      position: "Trustee",
      avatar: "/images/team/placeholder.png",
      bio: "Oversees legal compliance and institutional policy, ensuring the foundation adheres to its Declaration of Trust and statutory obligations.",
      teamType: TeamType.BOARD
    },
  ]

  const management = [
    {
      slug: "chief-executive-director",
      name: "TBA",
      position: "Chief Executive Director",
      avatar: "/images/team/placeholder.png",
      bio: "Leads the overall strategic direction and operational excellence of the Cornerstone Foundation, ensuring mission alignment across all departments.",
      teamType: TeamType.MANAGEMENT
    },
    {
      slug: "program-director",
      name: "TBA",
      position: "Program Director",
      avatar: "/images/team/placeholder.png",
      bio: "Oversees the design, delivery, and evaluation of all foundation programmes, ensuring quality and impact in education, water, and humanitarian initiatives.",
      teamType: TeamType.MANAGEMENT
    },
  ]

  for (const member of [...trustees, ...management]) {
    await prisma.user.upsert({
      where: { slug: member.slug },
      update: member,
      create: {
        ...member,
        email: `${member.slug}@cornerstone.or.ke`,
        role: 'EDITOR'
      }
    })
  }
  console.log('Team members seeded')

  // 5. Create Carousel Slides
  const slides = [
    {
      image: "/images/hero_scholarship_main.png",
      label: "Empowering Through Education",
      title: "Building a Brighter Future",
      subtitle: "The Cornerstone Foundation provides scholarships and bursaries ensuring every child, regardless of circumstance, has access to quality education across Kenya.",
      order: 0
    },
    {
      image: "/images/modern-school-exterior.jpg",
      label: "Educating the Youth",
      title: "Scholarships for Every Child",
      subtitle: "Ensuring access to quality education for the most vulnerable members of society through targeted bursaries and support.",
      order: 1
    },
  ]

  for (const slide of slides) {
    const existing = await prisma.carouselSlide.findFirst({ where: { image: slide.image } })
    if (!existing) {
      await prisma.carouselSlide.create({ data: slide })
    }
  }
  console.log('Carousel slides seeded')

  // 6. Create Blog Posts
  const blogPosts = [
    {
      slug: "bursary-distribution-2026",
      title: "2026 Bursary Distribution Reaches 120 Students",
      excerpt: "Cornerstone Foundation hands out full school bursaries to 120 students from underserved households across the region.",
      content: "This year's bursary distribution marks a significant milestone for the Cornerstone Foundation. Over 120 students from destitute, widowed, and orphaned households received full bursaries covering school fees, uniforms, textbooks, and mentorship support. Each recipient was carefully selected through a community-based vetting process to ensure the most vulnerable are prioritised. Education is the foundation's greatest tool for lasting change.",
      publishedAt: new Date("2026-01-15"),
      category: "Education",
      featuredImage: "/images/foundation_community_impact.png",
      status: BlogStatus.PUBLISHED,
    },
    {
      slug: "scholarship-intake-2026",
      title: "Scholarship Applications Open for 2026",
      excerpt: "Applications are now open for bright students from underserved households across Kenya.",
      content: "Education remains the greatest equalizer. We are proud to announce the opening of our 2026 scholarship intake. Aimed at exceptionally bright students from vulnerable backgrounds, these scholarships cover full tuition, uniforms, and a structured mentorship programme through to completion of high school. No child should be denied a future simply because of circumstance. Eligible candidates are encouraged to apply through their school's administration office before the deadline.",
      publishedAt: new Date("2026-02-02"),
      category: "Education",
      featuredImage: "/images/modern-school-exterior.jpg",
      status: BlogStatus.PUBLISHED,
    },
    {
      slug: "water-access-expansion",
      title: "Clean Water Project Keeps Girls in School",
      excerpt: "Three new boreholes free hundreds of children from daily water walks — giving them time to learn.",
      content: "The lack of clean water has long kept children, especially girls, out of school in rural Kenya. After completion of three new solar-powered boreholes serving over 2,500 community members, school attendance among girls in the affected villages has risen sharply. With water now accessible minutes from home, families no longer depend on children to walk miles each day. This infrastructural investment is, at its heart, an investment in education.",
      publishedAt: new Date("2026-02-28"),
      category: "Education",
      featuredImage: "/images/borehole_clean_water.png",
      status: BlogStatus.PUBLISHED,
    }
  ]

  for (const post of blogPosts) {
    const { category, ...postData } = post
    const cat = await prisma.category.findUnique({ where: { name: category } })
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {
        ...postData,
        categoryId: cat?.id,
        authorId: admin.id
      },
      create: {
        ...postData,
        categoryId: cat?.id,
        authorId: admin.id
      }
    })
  }
  console.log('Blog posts seeded')

  // 7. Gallery Items
  const galleryRaw = [
    { src: "/images/modern-school-exterior.jpg", caption: "New School Infrastructure", category: "Education" },
    { src: "/images/bibleless-run-flagoff.jpeg", caption: "Bibleless Run Flag-off Ceremony", category: "Humanitarian" },
    { src: "/images/modern-classroom-1.jpg", caption: "Engaged Students in New Facilities", category: "Education" },
    { src: "/images/president-ruto-founder-migosi-graduation.jpeg", caption: "President Ruto and Founder Migosi at Graduation", category: "Education" },
    { src: "/images/team/founder.jpeg", caption: "Founder Julius Migos Ogamba", category: "Leadership" },
    { src: "/images/borehole_clean_water.png", caption: "Clean Water Access Projects", category: "Water" },
  ]

  // Group by category
  const groupedGallery = galleryRaw.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = []
    acc[curr.category].push({ src: curr.src, caption: curr.caption })
    return acc
  }, {} as Record<string, any[]>)

  for (const [catName, imgs] of Object.entries(groupedGallery)) {
    const cat = await prisma.category.findUnique({ where: { name: catName } })
    const title = `${catName} Impact`
    const existing = await prisma.galleryItem.findFirst({ where: { title } })
    if (!existing) {
      await prisma.galleryItem.create({
        data: {
          title,
          description: `Visual overview of our ${catName.toLowerCase()} programs.`,
          images: imgs,
          categoryId: cat?.id
        }
      })
    }
  }
  console.log('Gallery seeded')

  console.log('Seed completed successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
