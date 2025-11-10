import { useState } from 'react'
import { CATEGORIES, Task } from '@/types'
import { uid } from '@/utils'

type Props = {
  onAdd: (task: Task) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState<'Work' | 'Personal' | 'Study' | 'Other'>('Work')

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!title.trim() || !dueDate) return
    const now = new Date().toISOString()
    const task: Task = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    onAdd(task)
    setTitle('')
    setDescription('')
    setDueDate('')
    setCategory('Work')
  }

  return (
    <form className="card form" onSubmit={handleSubmit} aria-label="Create task">
      <h2>Create Task</h2>
      <div className="grid-2">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
        </label>
        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={(e: any) => setDueDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="grid-2">
        <label>
          Category
          <select value={category} onChange={(e: any) => setCategory(e.target.value as any)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Optional details"
            rows={3}
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="btn primary" type="submit">
          Add Task
        </button>
      </div>
    </form>
  )
}