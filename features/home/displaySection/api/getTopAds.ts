'use server'

import {TPrimaryAndGenericColorString} from "@/shared/type";

export interface ITopAd {
  title: TPrimaryAndGenericColorString;
  contents: string;
  name: string;
  location: string;
  imgUrl: string;
}

export default async function getTopAds(): Promise<Array<ITopAd>> {
  const res: Array<ITopAd> = [];
  for(let i = 0; i < 3; i++) {
    res.push({
      title: [{type: 'primary', contents: 'TOP 메인 '}, {type: 'generic', contents: '광고주를 모십니다!'}],
      contents: 'TOP 메인 광고주를 모십니다!\n1670-2962로 문의주세요!',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
      location: '전국',
      name: '넷프로 대출',
    })
  }

  return res;
}
