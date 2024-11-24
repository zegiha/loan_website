import {TRealTimeLoan} from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/type";

export default function getRealTimeLoan(dataLength: number | undefined = 15): Array<TRealTimeLoan> {
  const dummy: TRealTimeLoan = {
    location: '인천',
    title: '200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다',
    writedTime: '20분 전',
  };
  const res: Array<TRealTimeLoan> = [];
  while(dataLength--) {
    res.push(dummy)
  }
  return res;
}
