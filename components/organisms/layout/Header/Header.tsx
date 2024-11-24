'use client'

import {Col, Row} from "@/components/atoms/layout";
import style from './header.module.scss';
import Image from "next/image";
import LogoImage from '@/public/assets/colorLogo.png';
import Typo from "@/components/atoms/typo/Typo";
import {CampaignIcon, ClockIcon, CompanyIcon, WarningIcon} from "@/components/atoms/icons";
import {IIcon} from "@/components/atoms/icons/BaseIcon";
import {useEffect, useRef, useState} from "react";

type TTopIconNavigation = 'company' | 'adContact' | 'recentlySeenCompany' | 'warnings';
interface ITopIconNavigation {
  icon: TTopIconNavigation,
  label: string,
  onClick: () => void,
}

export default function Header() {
  const bigHeaderRef = useRef<HTMLDivElement | null>(null);

  const [currentScrollYState, setCurrnetScrollYState] = useState<number>(0);
  const prevScrollYRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const visibleRef = useRef<boolean>(true);

  const topIconNavigation: Array<ITopIconNavigation> = [
    {icon: 'company', label: '업체 로그인', onClick: () => console.log('haha')},
    {icon: 'adContact', label: '광고 문의', onClick: () => console.log('haha')},
    {icon: 'recentlySeenCompany', label: '최근 본 업체', onClick: () => console.log('haha')},
    {icon: 'warnings', label: '주의 사항', onClick: () => console.log('haha')},
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setCurrnetScrollYState(currentScrollY);

      if(visibleRef.current) {
        if(currentScrollY < prevScrollYRef.current) {
          prevScrollYRef.current = currentScrollY;
        }
      } else {
        if(currentScrollY > prevScrollYRef.current + 136 && currentScrollY > 136) {
          prevScrollYRef.current = currentScrollY - 136;
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  useEffect(() => {
    console.log(currentScrollYState, prevScrollYRef.current);

    if(visibleRef.current && currentScrollYState - prevScrollYRef.current > 50) {
      setIsVisible(false);
      visibleRef.current = false;
      prevScrollYRef.current -= 136;
    } else if(!visibleRef.current && currentScrollYState - prevScrollYRef.current < -50) {
      setIsVisible(true);
      visibleRef.current = true;
      prevScrollYRef.current += 136;
    }
  }, [currentScrollYState]);

  return (
    <Col width={'fill'} className={style.allContainer}>
      {(
        <div className={isVisible ? style.bigContainer : style.bigContainerHidden}>
          <Row
            width={'fill'}
            alignItems={'center'}
            className={style.bigWrapper}
          >
            <Image
              src={LogoImage}
              alt={'로고 이미지'}
              width={213}
              height={45}
            />
            <Row
              width={'fill'}
              gap={8}
              justifyContents={'center'}
              alignItems={'center'}
            >
              <div style={{
                width: '100%',
                maxWidth: 440,
                height: 50,
                background: 'red',
              }}/>
              <div style={{
                width: '100%',
                maxWidth: 280,
                height: 50,
                background: 'red',
              }}/>
            </Row>
            <Row gap={16}>
              {topIconNavigation.map((v, i) => (
                <TopIconNavigation
                  key={i}
                  {...v}
                />
              ))}
            </Row>
          </Row>
        </div>
      )}
    </Col>
  );
}

function TopIconNavigation({
  icon,
  label,
  onClick
}: ITopIconNavigation) {
  const iconProps: IIcon = {
    color: 'dim',
    size: 48,
    fill: false,
  }
  return (
    <Col
      gap={4}
      alignItems={'center'}
      className={style.topIconNavigation}
      onClick={() => onClick()}
    >
      {
        icon === 'company' ?
          <CompanyIcon
            {...iconProps}
          /> : icon === 'adContact' ?
          <CampaignIcon
            {...iconProps}
          /> : icon === 'recentlySeenCompany' ?
            <ClockIcon
              {...iconProps}
            /> :
            <WarningIcon
              {...iconProps}
            />
      }
      <Typo.Contents color={'dim'} width={'hug'}>
        {label}
      </Typo.Contents>
    </Col>
  );
}
