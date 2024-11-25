import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import style from "@/features/home/PremiumBannerAndRealTimeLoanSection/premiumBannerAndRealTimeLoanSection.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import React from "react";
import {PlusIcon} from "@/components/atoms/icons";
import getRealTimeLoans from "@/features/home/PremiumBannerAndRealTimeLoanSection/api/getRealTimeLoans";
import {TRealTimeLoan} from "@/features/home/PremiumBannerAndRealTimeLoanSection/type";

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
          className={`${iconButton.iconButton40}`}
          onClick={() => {}}
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
          {getRealTimeLoans().map((v, i) => (
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
  return (
    <Row
      gap={12}
      alignItems={'center'}
      width={'fill'}
      className={style.realTimeLoan}
    >
      <Row
        gap={8}
        alignItems={'center'}
        width={'fill'}
      >
        <div className={`${style.locationChip}`}>
          <Typo.Contents color={'dim'}>
            {location}
          </Typo.Contents>
        </div>
        <Typo.Contents width={'fill'} textOverflowLine={1}>
          {title}
        </Typo.Contents>
      </Row>
      <Typo.Caption color={'dim'}>
        {createdAt}
      </Typo.Caption>
    </Row>
  );
}
