import Link from 'next/link'
import { formatDate } from '@/lib/utils'
export default function PostCard({ post }: any) {
  return (
    <article className="p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
      <p className="text-sm text-gray-600">By {post.author?.name ?? post.author.email} • {formatDate(post.createdAt)}</p>
      <p className="mt-2 text-gray-700 line-clamp-3">{post.content.slice(0, 200)}...</p>
    </article>
  )
}
