export default function error_checker(
  check_errors: Array<(v: any) => string | null>,
  value: any
): string | null {
  for(let i  = 0; i < check_errors.length; i++) {
    const new_error = check_errors[i](value)
    if(new_error !== null) {
      return new_error
    }
  }
  return null
}
