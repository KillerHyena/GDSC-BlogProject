'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
export default function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">GDSC Blog</Link>
        <div className="space-x-4">
          <Link href="/" className="text-sm">Home</Link>
          {session?.user ? (
            <>
              <Link href="/(dashboard)" className="text-sm">Dashboard</Link>
              <button onClick={() => signOut()} className="text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link href="/(auth)/signin" className="text-sm">Sign in</Link>
              <Link href="/(auth)/signup" className="text-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
