import { z } from 'zod'

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
)

export const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
])

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

export type Task = z.infer<typeof taskSchema>

export type TaskFormData = Pick<Task, 'name' | 'description'>

export type TaskStatus = z.infer<typeof taskStatusSchema>

export type Auth = z.infer<typeof authSchema>

export type ConfirmToken = Pick<Auth, 'token'>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>

export type UserRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
