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
        <Row width={'fill'} className={style.loanNumberSection}>
          <Typo.SubBody color={'dim'}>
            2024-경기광주-0002
          </Typo.SubBody>
        </Row>
        <Divider/>
        <HeaderTop/>
      </Col>
      <HeaderBottom/>
    </Col>
  );
}


