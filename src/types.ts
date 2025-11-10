export type Task = {
  id: string
  title: string
  description: string
  dueDate: string // ISO date string
  category: 'Work' | 'Personal' | 'Study' | 'Other'
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TaskStatusFilter = 'all' | 'active' | 'completed'

export const CATEGORIES: Array<Task['category']> = [
  'Work',
  'Personal',
  'Study',
  'Other',
]