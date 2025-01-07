export default function is_correct_id(v: string): string | null {
  if (v.length < 4) {
    return 'id는 4글자 이상이어야 합니다';
  }
  if (!/^[a-zA-Z]/.test(v)) {
    return 'id는 영어로 시작해야 합니다';
  }
  if (!/^[a-zA-Z0-9]+$/.test(v)) {
    return 'id는 영어와 숫자로만 이루어져야 합니다';
  }
  return null;
}
