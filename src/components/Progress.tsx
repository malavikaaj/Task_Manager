type Props = {
  total: number
  completed: number
}

export default function Progress({ total, completed }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  return (
    <div className="progress" aria-label="Completion progress">
      <div className="progress-bar" style={{ width: `${percent}%` }} />
      <span className="progress-label">{percent}% completed</span>
    </div>
  )
}