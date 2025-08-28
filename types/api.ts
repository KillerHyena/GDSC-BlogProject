export type RegisterDTO = { name?: string; email: string; password: string }
export type PostCreateDTO = { title: string; content: string; categoryId: string; tagIds?: string[] }
export type CommentDTO = { postId: string; content: string }
