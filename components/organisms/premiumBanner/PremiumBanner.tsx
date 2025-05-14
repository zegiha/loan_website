'use client'

import Typo from '@/components/atoms/typo/Typo'
import {useAdsPublicControllerSearchAds} from '@/entities/api/advertisement-public/advertisement-public'
import {IPremium_banner_data} from '@/shared/type'
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
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

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

  const {
    data,
    status,
  } = useAdsPublicControllerSearchAds('프리미엄 배너광고', {}, {
    query: {
      select: v => {
        const res: Array<IPremium_banner_data> = []
        v.forEach(v => {
          res.push({
            ...v,
            id: v.company_id,
            title: v.title ?? '',
            location: v.loan_available_location?.join(', ') ?? '',
            name: v.user.companyName,
          })
        })
        return res
      }
    }
  })

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

  return (
    <Col
      ref={wrapperRef}
      gap={12}
      width={'fill'}
      alignItems={'center'}
    >
      {status === 'success' && (
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
          slidesPerView={cardNumber}
          style={{
            paddingLeft: 1,
          }}
        >
          {data !== null && data.map((v, i) => (
            <SwiperSlide key={i}>
              <Link href={`/loan/${v.id}`}>
                <PremiumCard {...v}/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {status === 'pending' && (
        <Row
          width={'fill'}
          justifyContents={'center'}
          style={{padding: '32px 0'}}
        >
          <Player src={load} autoplay loop style={{height: 24}}/>
        </Row>
      )}
      {status === 'error' && (
        <Row
          width={'fill'}
          justifyContents={'center'}
          style={{padding: '32px 0'}}
        >
          <Typo.Body color={'dim'} emphasize>
            다시시도해주세요
          </Typo.Body>
        </Row>
      )}
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
}
