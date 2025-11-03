import { z } from 'zod'

export const contactSchema = z.object({
  senderEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(500, 'Email is too long'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message is too long (max 5000 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>

