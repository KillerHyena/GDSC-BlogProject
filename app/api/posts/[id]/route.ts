import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { postCreateSchema } from '@/lib/validators'
import { slugify } from '@/lib/utils'

export async function GET(req: Request, { params }: any) {
  const { id } = params
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, category: true, tags: { include: { tag: true } }, comments: true }
  })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PATCH(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (post.authorId !== (session.user as any).id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const parsed = postCreateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
  const { title, content, categoryId, tagIds } = parsed.data
  const slug = slugify(title)
  const updated = await prisma.post.update({
    where: { id },
    data: {
      title, content, slug, categoryId,
      tags: { deleteMany: {}, create: tagIds && tagIds.length ? tagIds.map((tid: string) => ({ tagId: tid })) : [] }
    },
    include: { author: true, category: true, tags: { include: { tag: true } } }
  })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: any) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (post.authorId !== (session.user as any).id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
