
export default function formatDatesForScreen(selectedDates: string[]) {
    const formatDatesArray: string[] = new Array()
    selectedDates.forEach((date: string) => {
        const currentDate = new Date(date)
        const formattedDate = currentDate.toLocaleDateString('da-DA', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        })
        formatDatesArray.push(formattedDate)
    })
    return formatDatesArray
}