export default function is_correct_phone_number(text: string): boolean {
  const numbers = text.replace(/[^0-9]/g, '')
  return numbers.length === 11 &&
    numbers.startsWith('010')
}
