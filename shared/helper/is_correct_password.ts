export default function is_correct_password(v: string) {
  console.log(v);
  if(!/[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]+$/.test(v)) {
    alert('비밀번호는 영어 소문자, 대문자, 특수문자로만 이루어져야합니다')
  } else if(!/^.{8,}$/.test(v)) {
    alert('비밀번호는 8글자 이상이어야합니다')
  } else if(!/^[a-zA-Z]/.test(v)) {
    alert('비밀번호는 영어로 시작되어야합니다')
  } else if(!/^(?=.*[a-zA-Z])(?=.*\d)/.test(v)) {
    alert('비밀번호에는 1개 이상의 영문자, 숫자가 필요합니다')
  } else {
    return true;
  }
  return false;
}
