'use client'

import {Col, Divider, Row} from "@/components/atoms/layout";
import Typo from '@/components/atoms/typo/Typo'
import React from 'react'
import style from './header.module.scss';
import {HeaderBottom, HeaderTop} from "@/components/molecules/Layout";
import useHeaderTopAnimation from "@/components/molecules/Layout/headerTop/hooks/useHeaderTopAnimation";

export default function Header() {
  const {isVisible} = useHeaderTopAnimation();
  return (
    <Col width={'fill'} className={`${style.allContainer} ${isVisible ? '' : style.translate}`}>
      <Col width={'fill'}>
        <Col width={'fill'} alignItems={'center'} className={style.loanNumberSectionContainer}>
          <Row width={'fill'} className={style.loanNumberSectionWrapper}>
            <Typo.SubBody color={'dim'}>
              2024-경기광주-0002
            </Typo.SubBody>
          </Row>
        </Col>
        <Divider/>
        <HeaderTop/>
      </Col>
      <HeaderBottom/>
    </Col>
  );
}


