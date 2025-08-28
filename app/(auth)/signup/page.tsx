'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  async function onSubmit(data: any) {
    const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    if (res.ok) router.push('/(auth)/signin')
    else alert('Registration failed')
  }
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name')} placeholder="Name (optional)" className="w-full p-2 border rounded" />
        <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Create account</button>
      </form>
    </div>
  )
}
