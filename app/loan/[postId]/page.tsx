'use server';

import {Col, Divider} from "@/components/atoms/layout";
import {TPrimaryAndGenericColorString} from "@/shared/type";
import CompanySection from "@/features/loanDetails/CompanySection";
import ProductSection from "@/features/loanDetails/ProductSection";
import AdditionalExplain from "@/features/loanDetails/AdditionalExplain";
import {DetailsTitleSection} from "@/components/organisms";

export default async function LoanDetails() {
  const title: TPrimaryAndGenericColorString = [
    {type: 'primary', contents: '無방문 '},
    {type: 'generic', contents: '24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행 24시 당일입금 비대면 정식등록업체 간편진행'}
  ]

  const loanDetailsData: {
    title: TPrimaryAndGenericColorString,
    contents: Array<{subTitle: string, contents: Array<{title: string, contents: string}>}>,
  } = {
    title: title,
    contents: [
      {
        subTitle: '업체',
        contents: [
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
        ]
      },
      {
        subTitle: '상품',
        contents: [
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
          {title: '업체명', contents: '스마트 대부 중개'},
        ]
      },
    ],
  }

  return (
    <Col width={'fill'}>
      <DetailsTitleSection type={'loan'} title={title}/>
      <Divider height={8}/>
      <CompanySection
        contents={loanDetailsData.contents[0].contents}
      />
      <Divider height={8}/>
      <ProductSection
        contents={loanDetailsData.contents[1].contents}
      />
      <Divider height={8}/>
      <AdditionalExplain
        contents={`haha\nhoho`}
      />
    </Col>
  );
}


