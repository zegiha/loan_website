'use server'
import {Col, Divider, Row} from "@/components/atoms/layout";
import BottomSection from '@/components/organisms/layout/footer/BottomSection'
import MidSection from '@/components/organisms/layout/footer/MidSection'
import TopSection from '@/components/organisms/layout/footer/TopSection'
import style from './footer.module.scss';
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import LogoImage from '@/public/assets/colorLogo.png';
import {semantic_object} from "@/shared/color";

export default async function Footer() {
  return (
    <Col width={'fill'} alignItems={'center'} style={{backgroundColor: semantic_object.surface.surfaceDim}}>
      <TopSection/>
      <MidSection/>
      <BottomSection/>
    </Col>
  );
}

