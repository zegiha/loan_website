import get_temp_image from '@/shared/api/get_temp_image'
import {TPrimaryAndGenericColorString} from "@/shared/type";

export interface ITopAd {
  title: TPrimaryAndGenericColorString;
  contents: string;
  name: string;
  imgUrl: string;
}

export default async function getTopAds(): Promise<Array<ITopAd>> {
  const res: Array<ITopAd> = [];
  const tmp: Omit<ITopAd, 'imgUrl'> = {
    title: [{type: 'primary', contents: '무방문 무서류 당일 대출'}],
    contents: '지역 시간 장소 제약 X 월별 당일승인 당일송금',
    name: '넷프로 대출',
  }
  for(let i = 0; i < 3; i++) {
    res.push({
      ...tmp,
      imgUrl: get_temp_image(i * 21783451),
    })
  }

  return res;
}
