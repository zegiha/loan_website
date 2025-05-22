
export default function formatting_phone_number(text: string) {
  // 숫자만 추출
  const onlyNumbers = text.replace(/[^0-9]/g, "");

  // 최대 11자리까지 허용
  const trimmedNumbers = onlyNumbers.slice(0, 11);

  let formattedNumber = trimmedNumbers;

  if (trimmedNumbers.length <= 3) {
    formattedNumber = trimmedNumbers;
  } else if (trimmedNumbers.length <= 7) {
    // 예: 02-123456, 01-234567
    formattedNumber = trimmedNumbers.replace(/(\d{2})(\d{1,5})/, "$1-$2");
  } else if (trimmedNumbers.length === 11) {
    // 000-0000-0000 (휴대폰)
    formattedNumber = trimmedNumbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else {
    // 00-0000-0000 (예: 지역번호 02-1234-5678 등, 9~10자리 포함)
    formattedNumber = trimmedNumbers.replace(/(\d{2})(\d{4})(\d{1,4})/, "$1-$2-$3");
  }

  return formattedNumber;
}
