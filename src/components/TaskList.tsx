import { Task } from '@/types'
import TaskCard from './TaskCard'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (t: Task) => void
  onReorder: (sourceId: string, targetId: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit, onReorder }: Props) {
  let dragSource: string | null = null

  function handleDragStart(id: string) {
    dragSource = id
  }

  function handleDrop(targetId: string) {
    if (dragSource && dragSource !== targetId) {
      onReorder(dragSource, targetId)
    }
    dragSource = null
  }

  return (
    <section aria-label="Task list" className="task-grid" role="list">
      {tasks.length === 0 && <p className="muted">No tasks to show.</p>}
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragOver={() => {}}
          onDrop={handleDrop}
        />
      ))}
    </section>
  )
}