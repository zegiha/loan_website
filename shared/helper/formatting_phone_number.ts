export default function formatting_phone_number(text: string) {
  // 숫자만 추출
  const onlyNumbers = text.replace(/[^0-9]/g, "");

  // 최대 길이 제한 (11자리까지만 허용)
  const trimmedNumbers = onlyNumbers.slice(0, 11);

  // 번호 형식으로 실시간 변환
  let formattedNumber = trimmedNumbers;
  if (trimmedNumbers.length <= 3) {
    formattedNumber = trimmedNumbers; // 010
  } else if (trimmedNumbers.length <= 7) {
    formattedNumber = trimmedNumbers.replace(/(\d{3})(\d{1,4})/, "$1-$2"); // 010-1234
  } else {
    formattedNumber = trimmedNumbers.replace(
      /(\d{3})(\d{4})(\d{1,4})/,
      "$1-$2-$3"
    ); // 010-1234-5678
  }

  // 결과 저장
  return formattedNumber
}
