import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { postCreateSchema } from '@/lib/validators'
import { slugify } from '@/lib/utils'

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const parsed = postCreateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  const { title, content, categoryId, tagIds } = parsed.data
  const slug = slugify(title)
  const post = await prisma.post.create({
    data: {
      title, slug, content,
      authorId: (session.user as any).id,
      categoryId,
      tags: tagIds && tagIds.length ? { create: tagIds.map(id => ({ tagId: id })) } : undefined
    },
    include: { author: true, category: true, tags: { include: { tag: true } } }
  })
  return NextResponse.json(post, { status: 201 })
}
