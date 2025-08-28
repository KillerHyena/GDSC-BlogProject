import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CommentList from '@/components/comments/CommentList'
import CommentForm from '@/components/comments/CommentForm'
import { formatDate } from '@/lib/utils'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: true, category: true, tags: { include: { tag: true } } }
  })
  if (!post) notFound()
  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    include: { author: true },
    orderBy: { createdAt: 'asc' }
  })
  return (
    <article>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">By {post.author.name ?? post.author.email} • {formatDate(post.createdAt)}</p>
      <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Comments</h2>
        <CommentList comments={comments} />
        <CommentForm postId={post.id} />
      </section>
    </article>
  )
}
