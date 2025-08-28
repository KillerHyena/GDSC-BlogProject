export default function CommentList({ comments }: any) {
  if (!comments || !comments.length) return <p className="mt-2">No comments yet.</p>
  return (
    <ul className="mt-2 space-y-2">
      {comments.map((c: any) => (
        <li key={c.id} className="p-2 border rounded bg-white">
          <div className="text-sm text-gray-700">{c.content}</div>
          <div className="text-xs text-gray-500">By {c.author?.name ?? c.author.email}</div>
        </li>
      ))}
    </ul>
  )
}
