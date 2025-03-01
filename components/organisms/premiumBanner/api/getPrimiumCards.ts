import {TPremiumCard} from "@/features/home/PremiumBannerAndRealTimeLoanSection/type";

export default function getPremiumCards(): Array<TPremiumCard> {
  const res: Array<TPremiumCard> = [];
  for(let i = 0; i < 20; i++) {
    res.push({
      title: [
        {type: 'primary', contents: '저신용자 상관없음 '},
        {type: 'generic', contents: '무서류 저신용자 상관 없음 무서류'},
      ],
      location: '전국',
      name: '스피드 대출',
    })
  }
  return res;
}
