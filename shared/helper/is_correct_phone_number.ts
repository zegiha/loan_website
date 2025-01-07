export default function is_correct_phone_number(text: string): string | null {
  const numbers = text.replace(/[^0-9]/g, '')
  if(!(numbers.length === 11)) {
    return '잘못된 전화번호 형식입니다'
  }
  return null
}
