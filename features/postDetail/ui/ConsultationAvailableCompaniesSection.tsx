'use client'

import {CompanyCardGrid, DetailsContentsSection} from "@/components/organisms";
import Link from "next/link";
import {Col, Divider, Row} from "@/components/atoms/layout";
import style from './consultation_available_companies.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {LocationIcon, PhoneIcon, PlusIcon} from "@/components/atoms/icons";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_consultation_available_companies} from "@/shared/type";
import {get_loan_inquiry_consultation_available_companies} from "@/shared/api";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json';
import {
  loanboardControllerRegisterAvailableCompany,
  useLoanboardControllerGetRegisterAvailableCompany
} from "@/entities/api/loanboard/loanboard";
import {use_auth_store} from "@/shared/store/authStore";
import {AxiosError} from "axios";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function ConsultationAvailableCompaniesSection({
  id
}: {
  id: string
}) {
  const {isLogin} = use_auth_store()

  const {data, is_loading} = useFetch(() => get_loan_inquiry_consultation_available_companies(id))
  return <DetailsContentsSection subTitle={'상담 가능 업체'}>
    {is_loading && (
      <Row width={'fill'} justifyContents={'center'}>
        <Player src={load} autoplay loop style={{height: 32}} />
      </Row>
    )}
    <CompanyCardGrid>
      {data && data.map((v, i) => (
        <Available_company_banner
          key={i}
          {...v}
        />
      ))}
    </CompanyCardGrid>
    <Row width={'fill'} justifyContents={'center'}>
      {isLogin && data && data.length < 10 && (
        <AddAvailableCompanyBanner id={id}/>
      )}
    </Row>
  </DetailsContentsSection>;
}

function AddAvailableCompanyBanner({
  id
}:{
  id: string
}) {
  const handleClick = async () => {
    try {
      await loanboardControllerRegisterAvailableCompany(id)
      alert('등록됐습니다')
    } catch(e) {
      if(e instanceof AxiosError) {
        if(e.response?.data?.message === "Company already registered for this loanboard")
          alert('이미 대출 가능 업체로 등록되어있습니다')
      } else if(typeof e === 'object' && !!e) {
        if('message' in e) {
          if(e.message === 'Company already registered for this loanboard')
            alert('이미 대출 가능 업체로 등록되어있습니다')
        }
      }
    }
  }

  return (
    <Col
      className={style.container}
      width={'fill'}
      justifyContents={'center'}
      alignItems={'center'}
      gap={4}
      onClick={() => {handleClick()}}
    >
      <PlusIcon
        color={'dim'}
        size={40}
      />
      <Typo.Caption color={'dim'}>
        상담 가능 업체 추가하기
      </Typo.Caption>
    </Col>
  )
}

function Available_company_banner({
  location,
  name,
  phone
}: ILoan_inquiry_consultation_available_companies) {
  return (
    <Link href={`/loan/${name}`}>
      <Col
        width={'fill'}
        gap={12}
        className={style.container}
      >
        <Col width={'fill'} gap={8} alignItems={'center'}>
          <Typo.Caption color={'dim'}>
            대출상담 가능업체
          </Typo.Caption>
          <Typo.SubBody emphasize width={'fill'} color={'variable'}>
            {name}
          </Typo.SubBody>
        </Col>
        <Divider/>
        <Row
          width={'fill'}
          gap={12}
        >
          <Row gap={4}>
            <PhoneIcon
              size={20}
              color={'dim'}
              fill
            />
            <Typo.Contents color={'dim'}>
              {phone}
            </Typo.Contents>
          </Row>
          <Row gap={4}>
            <LocationIcon
              size={20}
              color={'dim'}
            />
            <Typo.Contents color={'dim'}>
              {location}
            </Typo.Contents>
          </Row>
        </Row>
      </Col>
    </Link>
  )
}
