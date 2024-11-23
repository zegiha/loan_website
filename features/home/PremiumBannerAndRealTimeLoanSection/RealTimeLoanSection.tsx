import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/atoms/inputs";
import style from "@/features/home/PremiumBannerAndRealTimeLoanSection/premiumBannerAndRealTimeLoanSection.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import React from "react";

export default function RealTimeLoanSection({bannerHeight}: {bannerHeight: number}) {
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
          className={`${iconButton.iconButtonPadding8}`}
          onClick={() => {}}
        >
          <div style={{width: 24, height: 24, background: 'grey'}} />
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
          {Array.from({length: 12}).map(((_, i) => (
            <SwiperSlide key={i}>
              <RealTimeLoan/>
            </SwiperSlide>
          )))}
        </Swiper>
      </Col>
    </>
  );
}

function RealTimeLoan() {
  return (
    <Row
      gap={12}
      alignItems={'center'}
      width={'fill'}
      style={{padding: '4px 0', cursor: 'pointer'}}
    >
      <Row
        gap={8}
        alignItems={'center'}
        width={'fill'}
      >
        <div className={`${style.locationChip}`}>
          <Typo.Contents color={'dim'}>
            서울
          </Typo.Contents>
        </div>
        <Typo.Contents width={'fill'}>
          대학생 등록금 제출
        </Typo.Contents>
      </Row>
      <Typo.Caption color={'dim'}>
        2024.11.19
      </Typo.Caption>
    </Row>
  );
}
