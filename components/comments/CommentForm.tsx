'use client'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

export default function CommentForm({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const { register, handleSubmit, reset } = useForm()
  async function onSubmit(values: any) {
    if (!session) return alert('Please sign in to comment')
    const res = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, content: values.content }) })
    if (res.ok) {
      reset()
      // reload page to show comment (simple approach)
      window.location.reload()
    } else alert('Failed to post comment')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-2">
      <textarea {...register('content')} placeholder="Add a comment" className="w-full p-2 border rounded" />
      <button className="px-3 py-1 bg-gray-800 text-white rounded">Comment</button>
    </form>
  )
}
