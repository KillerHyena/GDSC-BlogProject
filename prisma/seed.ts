import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Tech', slug: 'tech' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Education', slug: 'education' }
  ]
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    })
  }

  const tags = [
    { name: 'NextJS', slug: 'nextjs' },
    { name: 'Tailwind', slug: 'tailwind' },
    { name: 'GDSC', slug: 'gdsc' },
    { name: 'Coding', slug: 'coding' },
    { name: 'Design', slug: 'design' }
  ]
  for (const t of tags) {
    await prisma.tag.upsert({
      where: { slug: t.slug },
      update: {},
      create: t
    })
  }
  console.log('Seeded categories and tags')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
