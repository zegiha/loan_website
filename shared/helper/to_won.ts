export default function to_won(v: string): string {
  const to_number = () => {
    let res = 0;
    for(let i = 0; i < v.length; i++) {
      if(v[i] !== ',') {
        res *= 10;
        res += Number(v[i])
      }
    }
    return res
  }
  const num = to_number()
  if (isNaN(num) || num === 0) return '';
  return num.toLocaleString('ko-KR');
}
