'use client'

import {CompanyCardGrid, DetailsContentsSection} from "@/components/organisms";
import Link from "next/link";
import {Col, Divider, Row} from "@/components/atoms/layout";
import style from './consultation_available_companies.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {LocationIcon, PhoneIcon} from "@/components/atoms/icons";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_consultation_available_companies} from "@/shared/type";
import {get_loan_inquiry_consultation_available_companies} from "@/shared/api";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function ConsultationAvailableCompaniesSection({
  id
}: {
  id: string
}) {
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
  </DetailsContentsSection>;
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
