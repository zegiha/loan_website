'use client';

import {Col, Row} from "@/components/atoms/layout";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import {ArrowIcon} from "@/components/atoms/icons";
import {Swiper, SwiperSlide} from "swiper/react";
import Typo from "@/components/atoms/typo/Typo";
import {usePaginationSwiper} from "@/shared/hooks";
import {Property} from "csstype";

export default function SwiperPaginationAndNavigation({
  children,
  height,
}: {
  children: Array<React.ReactNode>,
  height?: Property.Height,
}) {
  const {
    swiperRef,
    pagination,
    activeSlides,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleSwiperUpdate
  } = usePaginationSwiper();

  return (
    <Col gap={12} width={'fill'} style={{height: height}}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onUpdate={handleSwiperUpdate}
        spaceBetween={40}
        style={{
          height,
          paddingLeft: 1,
        }}
      >
        {children.map((v, i) => (
          <SwiperSlide key={i}>
            {v}
          </SwiperSlide>
        ))}
      </Swiper>
      <Row gap={8} width={'fill'} justifyContents={'center'}>
        <BaseButton
          className={`${iconButton.iconButton28}`}
          onClick={() => handlePrevSlide()}
        >
          <ArrowIcon
            size={20}
            color={'dim'}
            deg={180}
          />
        </BaseButton>
        {pagination.map((v, i) => (
          <BaseButton
            key={i}
            className={`${v === activeSlides ? iconButton.iconButton28Active : iconButton.iconButton28}`}
            onClick={() => handleToSlide(v)}
          >
            <Typo.Contents color={activeSlides === v ? 'generic' : 'dim'}>
              {v}
            </Typo.Contents>
          </BaseButton>
        ))}
        <BaseButton
          className={`${iconButton.iconButton28}`}
          onClick={() => handleNextSlide()}
        >
          <ArrowIcon
            size={20}
            color={'dim'}
          />
        </BaseButton>
      </Row>
    </Col>
  );
}
