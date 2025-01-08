import {IFaq_data} from "@/features/customer/faq/lib/type";

const user_faq_data: Array<IFaq_data> = [
  {
    title: '대출 시 주의할 점 있나요?',
    contents: `대출자와 대출 업체 간 직거래로 거래가 진행되기 때문에
대출 사고 위험이 있으므로 거래 전 각별히 주의를 기울이셔야 합니다.

당사이트 고객센터> 공지사항 내용 참고하시어
안전한 거래 진행하시기 바랍니다.`,
  },
  {
    title: '이자율이 어떻게 되나요?',
    contents: `업체마다 이율이 다르며 신용 소득에 따라 상이합니다.

참고로 법정 최고 금리 한도 연 20%를 넘을 수 없습니다.`
  },
  {
    title: '대출업체 상호명, 연락처 검색방법',
    contents: `PC 버전
홈페이지 상단 검색창에서 상호, 전화번호 입력 후 검색

모바일 버전
홈페이지 상단 우측 전체메뉴 클릭 > (상호, 연락처) 검색`
  }
]

export default user_faq_data
