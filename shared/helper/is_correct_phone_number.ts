export default function is_correct_phone_number(text: string): string | null {
  const numbers = text.replace(/[^0-9]/g, '');

  // 유효한 전화번호 형식: 10자리 또는 11자리
  if (numbers.length === 10 || numbers.length === 11) {
    // 앞자리가 0으로 시작하는지 확인
    if (numbers.startsWith('0')) {
      return null;
    }
  }

  return '잘못된 전화번호 형식입니다';
}
