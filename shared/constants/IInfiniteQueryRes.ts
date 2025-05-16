export default interface IInfiniteQueryRes<T> {
  currentPage: number,
  totalPage: number,
  data: Array<T>
}