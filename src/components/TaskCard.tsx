import { Task } from '@/types'
import { formatDate, isOverdue, isDueSoon } from '@/utils'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (t: Task) => void
  onDragStart?: (id: string) => void
  onDragOver?: (id: string) => void
  onDrop?: (id: string) => void
}

export default function TaskCard({ task, onToggle, onDelete, onEdit, onDragStart, onDragOver, onDrop }: Props) {
  const overdue = !task.completed && isOverdue(task.dueDate)
  const dueSoon = !task.completed && !overdue && isDueSoon(task.dueDate)
  return (
    <article
      className={`card task ${overdue ? 'overdue' : ''} ${task.completed ? 'completed' : ''} ${dueSoon ? 'due-soon' : ''}`}
      role="listitem"
      draggable
      onDragStart={() => onDragStart?.(task.id)}
      onDragOver={(e: any) => {
        e.preventDefault()
        onDragOver?.(task.id)
      }}
      onDrop={() => onDrop?.(task.id)}>
      <header className="task-header">
        <strong className="task-title">{task.title}</strong>
        <span className={`badge category-${task.category.toLowerCase()}`}>{task.category}</span>
      </header>
      <p className="task-desc">{task.description || '—'}</p>
      <div className="task-meta">
        <span className="due">Due: {formatDate(task.dueDate)}</span>
        {overdue && <span className="overdue-label" aria-live="polite">Overdue</span>}
        {dueSoon && <span className="due-soon-label" aria-live="polite">Due Soon</span>}
      </div>
      <div className="task-actions">
        <button className="btn" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  )
}