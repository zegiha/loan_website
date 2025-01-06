import {TAds_contents} from "@/features/my/new_ads/type";

const dummy_ads: Array<TAds_contents> = [
  {
    name: '프리미엄 배너1',
    price: 1200000,
    duration: 30,
    description: '가장 노출 수가 많은 배너입니다',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
  },
  {
    name: '프리미엄 배너2',
    price: 1200000,
    duration: 30,
    description: '가장 노출 수가 많은 배너입니다',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
  },
  {
    name: '프리미엄 배너3',
    price: 1200000,
    duration: 30,
    description: '가장 노출 수가 많은 배너입니다',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
  },
]

export default function get_ads() {
  return dummy_ads;
}
