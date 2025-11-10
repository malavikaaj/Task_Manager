import { saveTheme } from '@/storage'

type Props = {
  theme: 'light' | 'dark'
  onChange: (t: 'light' | 'dark') => void
}

export default function ThemeToggle({ theme, onChange }: Props) {
  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button
      aria-label="Toggle theme"
      className="btn"
      onClick={() => {
        saveTheme(next)
        onChange(next)
      }}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}