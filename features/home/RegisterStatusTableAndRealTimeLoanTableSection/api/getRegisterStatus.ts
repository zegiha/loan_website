import {TRegisterStatus} from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/type";

export default function getRegisterStatus(dataLength: number | undefined = 15): Array<TRegisterStatus> {
  const dummy:TRegisterStatus = {
    location: '인천',
    title: '200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다',
    companyName: '스피드 대출',
  }
  const res: Array<TRegisterStatus> = [];
  while(dataLength--) {
    res.push(dummy);
  }
  return res;
}
