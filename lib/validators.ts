import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6)
})

export const postCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.string().min(1),
  tagIds: z.array(z.string()).optional()
})

export const commentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(1)
})
