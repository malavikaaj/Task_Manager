import { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Filters from './components/Filters'
import Progress from './components/Progress'
import ThemeToggle from './components/ThemeToggle'
import { Task, TaskStatusFilter } from './types'
import { loadTasks, saveTasks, loadTheme, saveTheme } from './storage'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskStatusFilter>('all')
  const [editing, setEditing] = useState<Task | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(loadTheme())
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const filteredAndSearchedTasks = useMemo(() => {
    let filtered = tasks;
    switch (filter) {
      case 'active':
        filtered = tasks.filter((t) => !t.completed)
        break;
      case 'completed':
        filtered = tasks.filter((t) => t.completed)
        break;
      default:
        filtered = tasks;
    }

    const q = searchQuery.trim().toLowerCase()
    if (q) {
      return filtered.filter((task) => {
        const title = (task.title || '').toLowerCase()
        const desc = (task.description || '').toLowerCase()
        const cat = (task.category || '').toLowerCase()
        return title.includes(q) || desc.includes(q) || cat.includes(q)
      })
    }
    return filtered;
  }, [tasks, filter, searchQuery]);

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  function addTask(task: Task) {
    setTasks((prev) => [task, ...prev])
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
    )
  }

  function deleteTask(id: string) {
    if (confirm('Delete this task?')) {
      setTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  function saveEdit(updated: Task) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setEditing(null)
  }

  function reorderTasks(sourceId: string, targetId: string) {
    setTasks((prev) => {
      const srcIdx = prev.findIndex((t) => t.id === sourceId)
      const tgtIdx = prev.findIndex((t) => t.id === targetId)
      if (srcIdx === -1 || tgtIdx === -1) return prev
      const cloned = [...prev]
      const [moved] = cloned.splice(srcIdx, 1)
      cloned.splice(tgtIdx, 0, moved)
      return cloned
    })
  }

  return (
    <div className="container">
      <header className="topbar">
        <h1>Task Manager</h1>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <TaskForm onAdd={addTask} />

       <div className="search-bar">
         <input
           type="text"
           placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
         />
       </div>

      <section className="toolbar">
        <Filters filter={filter} onChange={setFilter} />
        <Progress total={tasks.length} completed={completedCount} />
      </section>

      <TaskList
        tasks={filteredAndSearchedTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={(t) => setEditing(t)}
        onReorder={reorderTasks}
      />

      {editing && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Edit Task</h3>
            <form
              className="grid-2"
              onSubmit={(e: any) => {
                e.preventDefault()
                saveEdit(editing)
              }}
            >
              <label>
                Title
                <input
                  value={editing.title}
                  onChange={(e: any) => setEditing({ ...editing, title: e.target.value })}
                  required
                />
              </label>
              <label>
                Due Date
                <input
                  type="date"
                  value={editing.dueDate}
                  onChange={(e: any) => setEditing({ ...editing, dueDate: e.target.value })}
                  required
                />
              </label>
              <label>
                Category
                <select
                  value={editing.category}
                  onChange={(e: any) => setEditing({ ...editing, category: e.target.value as any })}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Description
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e: any) => setEditing({ ...editing, description: e.target.value })}
                />
              </label>
              <div className="form-actions">
                <button type="button" className="btn" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn primary"
                  onClick={() => setEditing({ ...editing, updatedAt: new Date().toISOString() })}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}