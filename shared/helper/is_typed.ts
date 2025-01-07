export default function is_typed(v: any): string | null {
  if(!v) {
    return '필수 입력 값입니다'
  }
  return null
}
