import { Task } from './types'

const STORAGE_KEY = 'task_manager_tasks'
const THEME_KEY = 'task_manager_theme'

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function loadTheme(): 'light' | 'dark' {
  const raw = localStorage.getItem(THEME_KEY)
  return raw === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: 'light' | 'dark') {
  localStorage.setItem(THEME_KEY, theme)
}