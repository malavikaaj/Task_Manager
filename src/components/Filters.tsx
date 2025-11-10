import { TaskStatusFilter } from '@/types'

type Props = {
  filter: TaskStatusFilter
  onChange: (f: TaskStatusFilter) => void
}

export default function Filters({ filter, onChange }: Props) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {(['all', 'active', 'completed'] as TaskStatusFilter[]).map((f) => (
        <button
          key={f}
          className={`btn ${filter === f ? 'selected' : ''}`}
          onClick={() => onChange(f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}