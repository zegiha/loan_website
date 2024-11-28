'use client'

import {Col} from "@/components/atoms/layout";
import style from './header.module.scss';
import {HeaderBottom, HeaderTop} from "@/components/molecules/Layout";
import useHeaderTopAnimation from "@/components/molecules/Layout/headerTop/hooks/useHeaderTopAnimation";

export default function Header() {
  const {isVisible} = useHeaderTopAnimation();
  return (
    <Col width={'fill'} className={`${style.allContainer} ${isVisible ? '' : style.translate}`}>
      <HeaderTop isVisible={isVisible} />
      <HeaderBottom/>
    </Col>
  );
}


