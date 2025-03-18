import {TPrimaryAndGenericColorString} from "@/shared/type";

export interface ITopAd {
  title: TPrimaryAndGenericColorString;
  contents: string;
  name: string;
  imgUrl: string;
}

export default async function getTopAds(): Promise<Array<ITopAd>> {
  const res: Array<ITopAd> = [];
  for(let i = 0; i < 3; i++) {
    res.push({
      title: [{type: 'primary', contents: '무방문 무서류 당일 대출'}],
      contents: '지역 시간 장소 제약 X 월별 당일승인 당일송금',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
      name: '넷프로 대출',
    })
  }

  return res;
}
