import {TRealTimeLoan} from "@/shared/type";

export default function getRealTimeLoan(dataLength: number | undefined = 15): Array<TRealTimeLoan> {
  const dummy: TRealTimeLoan = {
    id: 'id',
    location: '인천',
    title: '200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다',
    createdAt: '2분 전',
  };
  const res: Array<TRealTimeLoan> = [];
  while(dataLength--) {
    res.push(dummy)
  }
  return res;
}
