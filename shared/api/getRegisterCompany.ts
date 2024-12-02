import {TRegisterStatus} from "@/shared/type";

export default function getRegisterCompany(dataLength: number | undefined = 15, filter?: Array<string>, loanLimit?: boolean): Array<TRegisterStatus> {
  const dummy:TRegisterStatus = {
    location: '인천',
    title: '200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다 200 대출문의드립니다',
    companyName: '스피드 대출',
    loanLimit: loanLimit ? '6,000만원' : undefined,
  }
  const res: Array<TRegisterStatus> = [];
  while(dataLength--) {
    res.push(dummy);
  }
  return res;
}

export function formatRegisteredCompany (
  rawData: Array<TRegisterStatus>,
  contentsNumberPerSlide: number
): Array<Array<TRegisterStatus>> {
  const res: Array<Array<TRegisterStatus>> = [];
  for(let i = 0; i < rawData.length; i++) {
    if(i % contentsNumberPerSlide === 0) res.push([]);
    res[res.length-1].push(rawData[i]);
  }
  return res;
}
