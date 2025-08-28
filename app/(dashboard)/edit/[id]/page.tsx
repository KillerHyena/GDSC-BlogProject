import { prisma } from '@/lib/prisma'
import PostForm from '@/components/posts/PostForm'

export default async function EditPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id }, include: { tags: { include: { tag: true } } } })
  if (!post) return <p>Not found</p>
  // Pass initial data via props (client component will fetch current data via form initialValues)
  return <div><h1 className="text-2xl font-bold mb-4">Edit Post</h1><PostForm initialPost={post} /></div>
}
