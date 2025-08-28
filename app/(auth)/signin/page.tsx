'use client'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Signin() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  async function onSubmit(data: any) {
    const res = await signIn('credentials', { redirect: false, email: data.email, password: data.password })
    if (res?.ok) router.push('/')
    else alert('Invalid credentials')
  }
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
      </form>
    </div>
  )
}