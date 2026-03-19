import { format} from "date-fns"

export function formatDate(date: Date) {
    return format (date, "yyyy-MM-dd")

}

// format date string from dd-mm-yyyy to yyyy-mm-dd
export function formatDateDDMMYYYY (date: string) {
    const [ day, month, year] = date.split("-")


    return `${year}-${month}-${day}`
}
