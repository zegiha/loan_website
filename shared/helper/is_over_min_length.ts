export default function is_min_length(v: string, size: number, over_or_more: 'over' | 'more' = 'more') {
  if(over_or_more === 'over') {
    if(!(v.length > size)) {
      return `${size}자 초과이어야 합니다`
    }
  } else {
    if(!(v.length >= size)) {
      return `${size}자 이상이어야 합니다`
    }
  }
  return null
}
