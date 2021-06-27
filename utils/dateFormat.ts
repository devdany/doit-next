export const dateToFormatted = (date: Date) => {
  const year = date.getFullYear()
  let month: number | string = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month
  }

  let day: number | string = date.getDate();

  if (day < 10) {
    day = '0' + day
  }

  return `${year}.${month}.${day}`
}