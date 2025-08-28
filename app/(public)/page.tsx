import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import PostList from '@/components/posts/PostList'

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true, category: true, tags: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">GDSC Blog</h1>
        <Link href="/(auth)/signin" className="text-sm underline">Sign in</Link>
      </header>
      <PostList posts={posts} />
    </div>
  )
}
