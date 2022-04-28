export const getDateString = (time: number): string => {
    const dateObj = new Date(time)
    return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString().slice(0, 5)
}