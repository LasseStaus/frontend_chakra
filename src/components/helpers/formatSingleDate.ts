export function formatDate(currentDate: Date |  string) {
  const formattedDate = new Date(currentDate).toLocaleDateString('da-DA', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
  return formattedDate
}
