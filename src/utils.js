import { filter } from "lodash";
export const numberFormat = new Intl.NumberFormat('en', { notation: "compact", compactDisplay: "short" }).format

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export function getMaxOfArray(numArray) {
  return Math.max.apply(null, filter(numArray));
}

export function getMinOfArray(numArray) {
  return Math.min.apply(null, filter(numArray));
}

export function formatMonthRange(range) {
  let date = new Date(2022, 0, 1)
  date.setMonth(range[0])
  let start = date.toLocaleString('en-US', {
    month: 'long',
  })
  let startYear = date.getFullYear()
  date.setMonth(range[1])
  let end = date.toLocaleString('en-US', {
    month: 'long',
  })
  let endYear = date.getFullYear()

  return `${start} ${startYear} to ${end} ${endYear}`

}
