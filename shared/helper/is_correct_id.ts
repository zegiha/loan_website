export default function is_correct_id(v: string) {
  if(v.length < 4) {
    alert('id는 4글자 이상이어야합니다')
    return false;
  } else if(!/^[a-zA-Z]/.test(v)) {
    alert('id는 영어로 시작해야합니다')
    return false;
  } else if(!/[a-zA-Z0-9]/g.test(v)) {
    alert('id는 영어와 숫자로만 이루어져야합니다')
    return false;
  }
  return true;
}
