import {TPrimaryAndGenericColorString} from "@/shared/type";

export interface ICompanyWithImage {
  imgUrl: string;
  variableTitle: string;
  title: TPrimaryAndGenericColorString | string;
  phone: string;
  location: string;
  name: string;
}

export default function getRegisteredCompanyWithImage({
  dummyN=5,
  type
}: {
  dummyN: number | undefined,
  type: 'home' | 'location' | 'product'
}): Array<ICompanyWithImage>{
  const item:ICompanyWithImage = {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
    variableTitle: '무방문 무서류 당일 대출',
    title: '지역 시간 장소 제약X 월별 당일승인 당일송금',
    phone: '010-4612-4593',
    location: '전국',
    name: '스피드 대출',
  };
  const res: Array<ICompanyWithImage> = [];
  while(dummyN--) {
    res.push(item);
  }
  return res;
}
