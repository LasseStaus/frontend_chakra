import DateObject from "react-date-object"

export function FormatDatesforState(calenderDates: DateObject | DateObject[] | null) {
     const selectedDatesFormatted: string[] = new Array()
    const stringify = JSON.stringify(calenderDates)
    const parse = JSON.parse(stringify)
    for (const item in parse) {
      const dateUnix = `${parse[item]}`
      const realDate = new Date(parseInt(dateUnix))
      const test = realDate.toISOString()
      selectedDatesFormatted.push(test)
    }
    return selectedDatesFormatted  
}