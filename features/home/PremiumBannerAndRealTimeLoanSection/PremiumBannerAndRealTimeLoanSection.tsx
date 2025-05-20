'use client';

import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {semantic_object} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";
import {Col, Row} from "@/components/atoms/layout";
import RealTimeLoanSection from "@/features/home/PremiumBannerAndRealTimeLoanSection/RealTimeLoanSection";
import style from './premiumBannerAndRealTimeLoanSection.module.scss';
import {PremiumBanner} from "@/components/organisms";
import Section from "@/components/molecules/Layout/section/Section";

export default function PremiumBannerAndRealTimeLoanSection() {
  const premiumBannerRef = useRef<HTMLDivElement | null>(null);
  const [bannerHeight, setBannerHeight] = useState<number | null>(null);

  useEffect(() => {
    // Ref 값 초기 높이 설정
    if(premiumBannerRef.current) setBannerHeight(premiumBannerRef.current.offsetHeight)

    // 윈도우 리사이즈 이벤트 처리
    const handleResize = () => {
      if (premiumBannerRef.current) {
        setBannerHeight(premiumBannerRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Section backgroundColor={'surfaceDim'}>
      <Row width={'fill'} gap={24} className={style.allSection}>
        <Box ref={premiumBannerRef} className={style.bigBox}>
          <Typo.SubBody emphasize color={'variable'}>
            <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
              {`프리미엄 `}
            </span>
            대부업체
          </Typo.SubBody>
          <PremiumBanner defaultCardNumber={3} update_height={() => {
            if(premiumBannerRef.current) setBannerHeight(premiumBannerRef.current.offsetHeight);
          }} />
        </Box>
        <Box className={style.smallBox} inlineStyle={{
          height: `${bannerHeight}px`,
        }}>
          <RealTimeLoanSection bannerHeight={bannerHeight ?? 0}/>
        </Box>
      </Row>
    </Section>
  );
}

function Box({
  children,
  className,
  ref,
  inlineStyle,
}:{
  children: React.ReactNode,
  className?: string,
  ref?: React.MutableRefObject<HTMLDivElement | null>
  inlineStyle?: CSSProperties,
}) {
  return (
    <Col ref={ref} gap={24} className={`${style.box} ${className}`} style={inlineStyle}>
      {children}
    </Col>
  );
}

