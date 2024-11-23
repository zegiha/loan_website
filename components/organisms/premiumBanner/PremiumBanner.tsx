'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper/modules";
import PremiumCard from "@/components/molecules/premiumCard/PremiumCard";
import {useRef} from "react";
import type { Swiper as SwiperType } from "swiper";
import {BaseButton, iconButton} from "@/components/atoms/inputs";
import {Col, Row} from "@/components/atoms/layout";

export default function PremiumBanner({cardNumber}: {cardNumber: number}) {
  const swiperRef = useRef<SwiperType>();
  return (
    <Col gap={12} width={'fill'} alignItems={'center'}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        slidesPerGroup={cardNumber}
        slidesPerView={cardNumber}
      >
        {Array.from({length: 20}, (_, index) => index + 1).map((_, i) => (
          <SwiperSlide key={i}>
            <PremiumCard/>
          </SwiperSlide>
        ))}
      </Swiper>
      <Row gap={8}>
        <BaseButton
          className={`${iconButton.iconButtonPadding4}`}
          onClick={() => {swiperRef.current?.slidePrev(240)}}
        >
          <div style={{width: 20, height: 20, background: 'grey'}} />
        </BaseButton>
        <BaseButton
          className={`${iconButton.iconButtonPadding4}`}
          onClick={() => {swiperRef.current?.slideNext(240)}}
        >
          <div style={{width: 20, height: 20, background: 'grey'}} />
        </BaseButton>
      </Row>
    </Col>
  );
}
