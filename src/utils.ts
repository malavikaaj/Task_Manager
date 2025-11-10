export function isOverdue(isoDate: string): boolean {
  const today = new Date()
  const due = new Date(isoDate)
  const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  const dueNoTime = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime()
  return dueNoTime < todayNoTime
}

export function isDueSoon(isoDate: string, days: number = 3): boolean {
  const today = new Date();
  const due = new Date(isoDate);
  const todayNoTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  const dueNoTime = new Date(
    due.getFullYear(),
    due.getMonth(),
    due.getDate()
  ).getTime();
  const diff = dueNoTime - todayNoTime;
  const oneDay = 24 * 60 * 60 * 1000;
  return diff > 0 && diff <= oneDay * days;
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString()
}

export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}