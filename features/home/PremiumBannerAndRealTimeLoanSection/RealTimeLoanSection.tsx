'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import style from "@/features/home/PremiumBannerAndRealTimeLoanSection/premiumBannerAndRealTimeLoanSection.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import React from "react";
import {PlusIcon} from "@/components/atoms/icons";
import {TRealTimeLoan} from "@/features/home/PremiumBannerAndRealTimeLoanSection/type";
import getRealTimeLoan from "@/shared/api/getRealTimeLoan";
import {useRouter} from "next/navigation";

export default function RealTimeLoanSection({bannerHeight}: {bannerHeight: number}) {
  const router = useRouter()
  return (
    <>
      <Row width={'fill'} justifyContents={'space-between'} alignItems={'center'}>
        <Typo.SubBody emphasize color={'variable'}>
          실시간 대출 문의
          <span className={semantic.onGenericOnGenericPrimary}>
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
          {getRealTimeLoan().map((v, i) => (
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
  title,
  location,
  createdAt
}: TRealTimeLoan) {
  const router = useRouter()
  return (
    <Row
      gap={12}
      alignItems={'center'}
      width={'fill'}
      onClick={() => {router.push('/post/id')}}
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
)
  ;
}
