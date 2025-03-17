'use client'

import {Col, Divider} from "@/components/atoms/layout";
import {ICompany_detail} from "@/shared/type";
import CompanySection from "@/features/loanDetails/CompanySection";
import ProductSection from "@/features/loanDetails/ProductSection";
import AdditionalExplain from "@/features/loanDetails/AdditionalExplain";
import {DetailsTitleSection} from "@/components/organisms";
import {useFetch} from "@/shared/hooks";
import {get_company_detail} from "@/shared/api";

export default function LoanDetails() {
  const {data} = useFetch(() => get_company_detail())
  const processing_data: (data: ICompany_detail) => {
    title: string,
    contents: Array<{subTitle: string, contents: Array<{title: string, contents: string}>}>,
  } = (data) => ({
    title: data.title,
    contents: [
      {
        subTitle: '업체정보',
        contents: [
          {title: '업체명', contents: data.company_name},
          {title: '대표자', contents: data.exponent},
          {title: '등록번호', contents: data.registration_number},
          {title: '등록기관', contents: data.registrar},
          {title: '영업지', contents: data.address},
        ]
      },
      {
        subTitle: '상품',
        contents: [
          {title: '월금리', contents: data.monthly_interest_rate},
          {title: '대출한도', contents: data.loan_limit},
          {title: '추가비용', contents: data.additional_cost},
          {title: '상환방식', contents: data.repayment_method},
          {title: '지역', contents: data.location},
          {title: '연금리', contents: data.yearly_interest_rate},
          {title: '연체금리', contents: data.delinquent_interest_rate},
          {title: '조기상환수수료', contents: data.early_repayment_fee},
          {title: '대출기간', contents: data.loan_period},
        ]
      },
    ],
  })

  if(data) return (
    <Col width={'fill'}>
      <DetailsTitleSection type={'loan'} title={processing_data(data).title}/>
      <Divider height={8}/>
      <CompanySection
        contents={processing_data(data).contents[0].contents}
        registration_certificate={data.registration_certificate}
      />
      <Divider height={8}/>
      <ProductSection
        contents={processing_data(data).contents[1].contents}
      />
      <Divider height={8}/>
      <AdditionalExplain
        contents={data.contents}
      />
    </Col>
  );
}


