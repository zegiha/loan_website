import {ILoanPost} from "@/shared/type/loanPost";

export default function getLoanPostList(dataNumberPerArray: number, allDataNumber: number | undefined = 15): Array<Array<ILoanPost>> {
  const res: Array<Array<ILoanPost>> = [];
  const rawData = [...getDummies(2, true), ...getDummies(allDataNumber)];

  let index = 0;
  while(index < rawData.length) {
    const end = index + dataNumberPerArray >= rawData.length ? rawData.length - 1 : index + dataNumberPerArray;
    res.push(rawData.slice(index, end));
    index += dataNumberPerArray;
  }

  return res;
}

function getDummies(n: number, isNotification?: boolean) {
  const dummy: ILoanPost = {
    type: '신용',
    title: '200 대출 문의드립니다',
    location: '인천',
    createdAt: '20분 전',
    viewCount: 293,
  }
  const notificationDummy: ILoanPost = {
    type: '공지',
    title: '(필독)대출직거래시 주의사항 및 예방안내',
    location: '',
    createdAt: '',
    viewCount: 1000,
  }
  const res: Array<ILoanPost> = [];
  if(isNotification) {
    for(let i = 0; i < n; i++) {
      res.push(notificationDummy);
    }
  } else {
    for(let i = 0; i < n; i++) {
      res.push(dummy)
    }
  }

  return res;
}
