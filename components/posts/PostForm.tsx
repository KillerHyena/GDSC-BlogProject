'use client'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PostForm({ initialPost }: any = {}) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: { title: initialPost?.title ?? '', content: initialPost?.content ?? '' } })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: any) {
    setLoading(true)
    const url = initialPost ? `/api/posts/${initialPost.id}` : '/api/posts'
    const method = initialPost ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    setLoading(false)
    if (res.ok) {
      router.push('/')
    } else {
      alert('Error saving post')
    }
  }

  useEffect(() => {
    if (initialPost) reset({ title: initialPost.title, content: initialPost.content })
  }, [initialPost, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register('title')} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea {...register('content')} placeholder="Content (HTML ok for demo)" rows={8} className="w-full p-2 border rounded" />
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{initialPost ? 'Update' : 'Publish'}</button>
      </div>
    </form>
  )
}
