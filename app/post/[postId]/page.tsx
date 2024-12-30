import {Col, Divider} from "@/components/atoms/layout";
import {DetailsTitleSection} from "@/components/organisms";
import {IAuthor, ILoan, IPost} from "@/features/postDetail/type";
import AuthorSection from "@/features/postDetail/ui/AuthorSection";
import LoanSection from "@/features/postDetail/ui/LoanSection";
import ContentsSection from "@/features/postDetail/ui/ContentsSection";
import ConsultationAvailableCompaniesSection
  from "@/features/postDetail/ui/ConsultationAvailableCompaniesSection";

interface IPostDetailData {
  post: IPost
  author: IAuthor
  loan: ILoan
}

const postDetailData: IPostDetailData = {
  post: {
    title: [{type: 'generic', contents: '200 대출문의드립니다'}],
    contents: '                    무 직 자 급 대 출 문 의\nhoho',
    createdAt: '0000.00.00 00:00',
  },
  author: {
    age: 24,
    gender: 'MALE',
    monthlyIncome: '1000만원',
    isJob: true,
  },
  loan: {
    location: '경기',
    amount: '200 만원',
    loanType: '신용',
  },
}

export default function PostDetail() {
  return (
    <Col width={'fill'}>
      <DetailsTitleSection
        type={'post'}
        title={postDetailData.post.title}
        createdAt={postDetailData.post.createdAt}
      />
      <Divider height={8}/>
      <AuthorSection {...postDetailData.author}/>
      <Divider height={8}/>
      <LoanSection {...postDetailData.loan}/>
      <Divider height={8}/>
      <ContentsSection contents={postDetailData.post.contents}/>
      {/*<Divider height={8}/>*/}
      {/*<ConsultationAvailableCompaniesSection/>*/}
    </Col>
  );
}
