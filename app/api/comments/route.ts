import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { commentSchema } from '@/lib/validators'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const postId = url.searchParams.get('postId')
  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 })
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { author: true },
    orderBy: { createdAt: 'asc' }
  })
  return NextResponse.json(comments)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const parsed = commentSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
  const comment = await prisma.comment.create({
    data: { content: parsed.data.content, postId: parsed.data.postId, authorId: (session.user as any).id },
    include: { author: true }
  })
  return NextResponse.json(comment, { status: 201 })
}
