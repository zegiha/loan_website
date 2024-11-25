import {TRealTimeLoan} from "@/features/home/PremiumBannerAndRealTimeLoanSection/type";

export default function getRealTimeLoans(): Array<TRealTimeLoan> {
  const res: Array<TRealTimeLoan> = [];
  for(let i = 0; i < 14; i++) {
    res.push({
      title: '대학생 등록금 제출',
      location: '서울',
      createdAt: '2024.11.19',
    })
  }
  return res;
}
