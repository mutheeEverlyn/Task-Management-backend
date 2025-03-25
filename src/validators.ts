import { z } from 'zod'

export const userSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    address:z.string(),
    password: z.string(),
    role: z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const taskSchema=z.object({
    task:z.string(),
    user_id:z.number(),
    status:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})