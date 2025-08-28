export type PostWithRelations = {
  id: string
  title: string
  slug: string
  content: string
  author: { id: string; name?: string | null; email: string }
  category: { id: string; name: string }
  tags?: { tag: { id: string; name: string } }[]
  createdAt: string
}
