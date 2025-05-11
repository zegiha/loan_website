'use client'

import {Col, Divider} from "@/components/atoms/layout";
import {useCompanyControllerGetCompany} from '@/entities/api/company/company'
import {ICompany_detail} from "@/shared/type";
import CompanySection from "@/features/loanDetails/CompanySection";
import ProductSection from "@/features/loanDetails/ProductSection";
import AdditionalExplain from "@/features/loanDetails/AdditionalExplain";
import {DetailsTitleSection} from "@/components/organisms";
import dynamic from 'next/dynamic'
import {useParams, useRouter} from 'next/navigation'
import load from '@/public/assets/load_dot_120.json'
import {useEffect} from 'react'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function LoanDetails() {
  const {postId: id} = useParams<{postId: string}>()

  const router = useRouter()

  const {
    data,
    status,
    error,
  } = useCompanyControllerGetCompany(id, {
    query: {
      select: v => {
        const res: ICompany_detail = {
          id,
          ...v,
          registration_number: v.user.registeredNumber,
          company_name: v.user.companyName,
          phone_number: v.user.advertisementTel,
          exponent: v.user.exponentName,
          address: v.user.companyLocation,
          registrar: v.user.registrar,

          monthly_interest_rate: v.monthlyInterestRate,
          yearly_interest_rate: v.yearlyInterestRate,
          delinquent_interest_rate: v.delinquentInterestRate,
          loan_limit: v.loanLimit.toString(),
          additional_cost: v.additionalCost,
          early_repayment_fee: v.earlyRepaymentFee,
          repayment_method: v.repaymentMethod,
          loan_period: v.loanPeriod,
          location: v.location.join(', '),
        }
        return res
      }
    }
  })

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
          {title: '전화번호', contents: data.phone_number},
        ]
      },
      {
        subTitle: '상품',
        contents: [
          {title: '월금리', contents: data.monthly_interest_rate},
          {title: '대출한도', contents: data.loan_limit !== undefined && data.loan_limit !== '' ? data.loan_limit : '상담 후 결정'},
          {title: '추가비용', contents: data.additional_cost !== undefined && data.additional_cost !== '' ? data.additional_cost : '상담 후 결정'},
          {title: '상환방식', contents: data.repayment_method !== undefined && data.repayment_method !== '' ? data.repayment_method : '상담 후 결정'},
          {title: '지역', contents: data.location !== undefined && data.location !== '' ? data.location : '상담 후 결정'},
          {title: '연금리', contents: data.yearly_interest_rate !== undefined && data.yearly_interest_rate !== '' ? data.yearly_interest_rate : '상담 후 결정'},
          {title: '연체금리', contents: data.delinquent_interest_rate !== undefined && data.delinquent_interest_rate !== '' ? data.delinquent_interest_rate : '상담 후 결정'},
          {title: '조기상환수수료', contents: data.early_repayment_fee !== undefined && data.early_repayment_fee !== '' ? data.early_repayment_fee : '상담 후 결정'},
          {title: '대출기간', contents: data.loan_period !== undefined && data.loan_period !== '' ? data.loan_period : '상담 후 결정'},
        ]
      },
    ],
  })

  useEffect(() => {
    if(status === 'error') {
      if(
        error.status === 404 ||
        error.response.data.message === 'Not Found'
      ) {
        alert('존재하지 않는 페이지')
        router.replace('/')
      }
    }
  }, [status]);

  if(status === 'success') return (
    <Col width={'fill'}>
      <DetailsTitleSection type={'loan'} title={processing_data(data).title}/>
      <Divider height={8}/>
      <CompanySection
        contents={processing_data(data).contents[0].contents}
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
  )
  if(status === 'pending') return (
    <Col
      width={'fill'}
      justifyContents={'center'}
      alignItems={'center'}
      style={{height: '100vh'}}
    >
      <Player
        src={load}
        autoplay
        loop
        style={{height: 32}}
      />
    </Col>
  )
}


