export default function is_correct_password(v: string): string | null {
  if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]+$/.test(v)) {
    return '영어,숫자,특수문자로만 이루어져야 합니다';
  }
  if (v.length < 8) {
    return '8글자 이상이어야 합니다';
  }
  if(24 < v.length) {
    return '24글자 이하이어야 합니다'
  }
  if (!/^[a-zA-Z]/.test(v)) {
    return '영어로 시작해야 합니다';
  }
  if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(v)) {
    return '영문자와 숫자가 최소 1개 포함되어야 합니다';
  }
  return null;
}
