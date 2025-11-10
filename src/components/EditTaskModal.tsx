import { useEffect, useState } from 'react'
import { Task, CATEGORIES } from '@/types'

type Props = {
  task: Task | null
  onClose: () => void
  onSave: (t: Task) => void
}

export default function EditTaskModal({ task, onClose, onSave }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState<'Work' | 'Personal' | 'Study' | 'Other'>('Work')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setDueDate(task.dueDate)
      setCategory(task.category)
    }
  }, [task])

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputDate = e.target.value;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (datePattern.test(inputDate)) {
      setDueDate(inputDate);
    } else if (inputDate === '') {
      setDueDate('');
    } else {
      
      console.log('Invalid date format or year length. Please use YYYY-MM-DD.');
    }
  }

  if (!task) return null

  function handleSave(e: any) {
    e.preventDefault()
    if (!title.trim() || !dueDate) return
    onSave({
      ...(task as Task),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      updatedAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit task">
      <div className="modal">
        <h3>Edit Task</h3>
        <form onSubmit={handleSave} className="grid-2">
          <label>
            Title
            <input value={title} onChange={(e: any) => setTitle(e.target.value)} required />
          </label>
          <label>
            Due Date
            <input type="date" value={dueDate} onChange={handleDateChange} required />
          </label>
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
            <textarea value={description} onChange={(e: any) => setDescription(e.target.value)} rows={3} />
          </label>
          <div className="form-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
