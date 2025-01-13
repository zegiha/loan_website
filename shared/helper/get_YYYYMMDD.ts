export default function get_YYYYMMDD(date: Date, separator: string | undefined = '.') {
  const add_zero = (v: string): string => {
    if(v.length < 2) {
      return '0' + v
    }
    return v
  }
  const y = date.getFullYear().toString()
  const m = add_zero((date.getMonth() + 1).toString())
  const d = add_zero((date.getDate()).toString())
  return `${y}${separator}${m}${separator}${d}`
}
