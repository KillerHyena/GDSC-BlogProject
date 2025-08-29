import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validators'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.errors }, { status: 400 })
  }
  const { name, email, password } = parsed.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email exists' }, { status: 400 })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { name, email, passwordHash } })
  return NextResponse.json({ ok: true }, { status: 201 })
}