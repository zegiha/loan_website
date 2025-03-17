'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import {useEffect, useRef, useState} from "react";
import type { Swiper as SwiperType } from "swiper";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import {Col, Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import {PremiumCard} from "@/components/molecules";
import Link from "next/link";
import {useFetch} from "@/shared/hooks";
import {get_premium_banner} from "@/shared/api";

export default function PremiumBanner({
  defaultCardNumber,
  update_height,
}: {
  defaultCardNumber: number,
  update_height?: () => void,
}) {
  const swiperRef = useRef<SwiperType>();
  const [cardNumber, setCardNumber] = useState(defaultCardNumber);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const {data, is_loading, error, refetch} = useFetch(() => get_premium_banner())

  const handleResize = () => {
    if (wrapperRef.current) {
      const width = wrapperRef.current.offsetWidth;

      if (width > 538 && cardNumber !== defaultCardNumber && defaultCardNumber > 2) {
        setCardNumber(defaultCardNumber);
      } else if (378 < width && width <= 538 && cardNumber !== 2 && defaultCardNumber > 2) {
        setCardNumber(2);
      } else if (width <= 378 && cardNumber !== 1 && defaultCardNumber > 1) {
        setCardNumber(1);
      }
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultCardNumber, cardNumber]);

  useEffect(() => {
    if(data && update_height) update_height();
    handleResize()
  }, [data]);

  if(data) return (
    <Col
      ref={wrapperRef}
      gap={12}
      width={'fill'}
      alignItems={'center'}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        slidesPerGroup={cardNumber}
        slidesPerView={cardNumber}
        style={{
          paddingLeft: 1,
        }}
      >
        {data.map((v, i) => (
          <SwiperSlide key={i}>
            <Link href={`/loan/${v.id}`}>
              <PremiumCard {...v}/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Row gap={8}>
        <BaseButton
          className={`${iconButton.iconButton28}`}
          onClick={() => {swiperRef.current?.slidePrev(240)}}
        >
          <ArrowIcon
            size={20}
            color={'dim'}
            deg={180}
          />
        </BaseButton>
        <BaseButton
          className={`${iconButton.iconButton28}`}
          onClick={() => {swiperRef.current?.slideNext(240)}}
        >
          <ArrowIcon
            size={20}
            color={'dim'}
          />
        </BaseButton>
      </Row>
    </Col>
  );
  else return null
}
