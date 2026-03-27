// calendar-utils — date grid computation for calendar component

export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

export function isDisabled(day: Date, min?: Date, max?: Date): boolean {
  if (min !== undefined && day < new Date(min.getFullYear(), min.getMonth(), min.getDate())) {
    return true
  }
  if (max !== undefined && day > new Date(max.getFullYear(), max.getMonth(), max.getDate())) {
    return true
  }
  return false
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const days = getDaysInMonth(year, month)
  const firstDow = days[0].getDay()
  const grid: (Date | null)[] = Array.from({ length: firstDow }, () => null)
  grid.push(...days)
  while (grid.length < 42) {
    grid.push(null)
  }
  return grid
}
