'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {semantic_object} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import style from "@/features/home/PremiumBannerAndRealTimeLoanSection/premiumBannerAndRealTimeLoanSection.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import React from "react";
import {PlusIcon} from "@/components/atoms/icons";
import {useRouter} from "next/navigation";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_data} from "@/shared/type";
import {get_loan_inquiry} from "@/shared/api";
import Link from "next/link";

export default function RealTimeLoanSection({bannerHeight}: {bannerHeight: number}) {
  const router = useRouter()
  const {data, is_loading, error, refetch} = useFetch(() => get_loan_inquiry())
  if(data) return (
    <>
      <Row width={'fill'} justifyContents={'space-between'} alignItems={'center'}>
        <Typo.SubBody emphasize color={'variable'}>
          실시간 대출 문의
          <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
                  {` 18`}
                </span>
          건
        </Typo.SubBody>
        <BaseButton
          className={`${iconButton.iconButton40}`}
          onClick={() => router.push('/post/create')}
        >
          <PlusIcon/>
        </BaseButton>
      </Row>
      <Col width={'fill'} className={style.realTimeLoanContainer}>
        <Swiper
          modules={[Autoplay]}
          direction={'vertical'}
          spaceBetween={12}
          slidesPerView={bannerHeight ? Math.floor((bannerHeight - 112) / 48) : 0}
          loop={true}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
        >
          {data.map((v, i) => (
            <SwiperSlide key={i}>
              <RealTimeLoan {...v}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </>
  );
}

function RealTimeLoan({
  id,
  title,
  location,
  createdAt
}: ILoan_inquiry_data) {
  return (
    <Link href={`/post/${id}`} style={{width: '100%'}}>
      <Row
        gap={12}
        alignItems={'center'}
        width={'fill'}
        className={style.realTimeLoan}
      >
        <div className={`${style.locationChip}`}>
          <Typo.Contents color={'dim'}>
            {location}
          </Typo.Contents>
        </div>
        <Typo.Contents width={'fill'} textOverflowLine={1} isPre>
          {title}
        </Typo.Contents>
        <Typo.Caption color={'dim'} width={'hug'} isPre>
          {createdAt}
        </Typo.Caption>
      </Row>
    </Link>
)
  ;
}
