import PostCard from './PostCard'
export default function PostList({ posts }: any) {
  if (!posts || !posts.length) return <p>No posts yet.</p>
  return <div className="space-y-4">{posts.map((p: any) => <PostCard key={p.id} post={p} />)}</div>
}
