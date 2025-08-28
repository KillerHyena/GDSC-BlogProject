import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Dashboard() {
  // NOTE: in a full app you would restrict with middleware / server session.
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/(dashboard)/new" className="text-blue-600 underline">New Post</Link>
      </header>
      <ul className="space-y-2">
        {posts.map(p => (
          <li key={p.id} className="p-3 border rounded">
            <div className="flex justify-between"><div><strong>{p.title}</strong><div className="text-sm text-gray-600">{p.slug}</div></div>
            <div className="space-x-2">
              <Link href={`/posts/${p.slug}`} className="text-blue-500">View</Link>
              <Link href={`/(dashboard)/edit/${p.id}`} className="text-yellow-600">Edit</Link>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
