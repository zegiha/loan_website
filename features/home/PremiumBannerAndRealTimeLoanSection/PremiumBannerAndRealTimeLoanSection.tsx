'use client';

import Section from "@/components/molecules/section/Section";
import style from './premiumBannerAndRealTimeLoanSection.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import PremiumBanner from "@/components/organisms/premiumBanner/PremiumBanner";
import {Col, Row} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/atoms/inputs";
import React, {CSSProperties, useEffect, useRef, useState} from "react";

export default function PremiumBannerAndRealTimeLoanSection() {
  const premiumBannerRef = useRef<HTMLDivElement | null>(null);
  const realTimeLoanRef = useRef<HTMLDivElement | null>(null);
  const [bannerHeight, setBannerHeight] = useState<number | null>(null);

  useEffect(() => {
    // premiumBannerRef의 초기 높이 설정
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
            <Col className={style.realTimeLoanContainer}>
              <Col
                ref={realTimeLoanRef}
                gap={12}
                className={style.realTimeLoanWrapper}
              >
                {Array.from({length: 40}).map((_, i) => (
                  <RealTimeLoan key={i} />
                ))}
              </Col>
            </Col>
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

function RealTimeLoan() {
  return (
    <Row
      gap={12}
      alignItems={'center'}
      style={{padding: '4px 0'}}
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
