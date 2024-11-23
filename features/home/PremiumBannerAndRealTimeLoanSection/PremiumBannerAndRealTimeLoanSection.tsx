'use client';

import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {semantic} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";
import {Col, Row} from "@/components/atoms/layout";
import Section from "@/components/molecules/section/Section";
import PremiumBanner from "@/components/organisms/premiumBanner/PremiumBanner";
import RealTimeLoanSection from "@/features/home/PremiumBannerAndRealTimeLoanSection/RealTimeLoanSection";
import style from './premiumBannerAndRealTimeLoanSection.module.scss';

export default function PremiumBannerAndRealTimeLoanSection() {
  const premiumBannerRef = useRef<HTMLDivElement | null>(null);
  const [bannerHeight, setBannerHeight] = useState<number | null>(null);

  useEffect(() => {
    // Ref 값 초기 높이 설정
    if (premiumBannerRef.current) {
      setBannerHeight(premiumBannerRef.current.offsetHeight);
    }

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
      <Col alignItems={'center'} width={'fill'}>
        <Row width={'fill'} gap={24} style={{maxWidth: 1440}}>
          <Box ref={premiumBannerRef} className={style.bigBox}>
            <Typo.SubBody emphasize color={'variable'}>
              <span className={semantic.onGenericOnGenericPrimary}>
                {`프리미엄 `}
              </span>
              대부업체
            </Typo.SubBody>
            <PremiumBanner cardNumber={3} />
          </Box>
          <Box className={style.smallBox} inlineStyle={{
            height: `${bannerHeight}px`,
          }}>
            <RealTimeLoanSection bannerHeight={bannerHeight ?? 0}/>
          </Box>
        </Row>
      </Col>
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

