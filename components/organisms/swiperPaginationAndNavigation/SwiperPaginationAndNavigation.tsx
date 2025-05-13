'use client';

import {Col, Row} from "@/components/atoms/layout";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import {ArrowIcon} from "@/components/atoms/icons";
import {ReactNode} from 'react'
import {Swiper, SwiperSlide} from "swiper/react";
import Typo from "@/components/atoms/typo/Typo";
import {usePaginationSwiper} from "@/shared/hooks";
import {Property} from "csstype";
import react_state_action from "@/shared/type/react_state_action";

export default function SwiperPaginationAndNavigation({
  children,
  activeSlides,
  setActiveSlides,
  maxSlideLength,
  height,
}: {
  children: Array<ReactNode> | ReactNode,
  activeSlides: number
  setActiveSlides: react_state_action<number>
  maxSlideLength?: number
  height?: Property.Height,
}) {
  const {
    swiperRef,
    pagination,
    handleNextSlide,
    handlePrevSlide,
    handleToSlide,
    handleSwiperUpdate,
  } = usePaginationSwiper(activeSlides, setActiveSlides, maxSlideLength);

  return (
    <Col gap={12} width={'fill'} style={{height: height}}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          handleSwiperUpdate(swiperRef.current)
        }}
        onSlideChange={(swiper) => {
          setActiveSlides(swiper.activeIndex+1)
        }}
        spaceBetween={40}
        style={{
          height,
          paddingLeft: 1,
        }}
      >
        {Array.isArray(children) ? (
          children.map((v, i) => (
            <SwiperSlide key={i}>
              {v}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            {children}
          </SwiperSlide>
        )}
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
