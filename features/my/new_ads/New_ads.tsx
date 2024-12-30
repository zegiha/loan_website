'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Image from "next/image";
import style from './style.module.scss';
import {BaseButton} from "@/components/molecules/inputs";
import CheckIcon from "@/components/atoms/icons/CheckIcon";

interface TAds_contents {
  name: string
  price: number
  duration: number
  description: string
  img: string
}

const ads: Array<TAds_contents> = [
  {
    name: '프리미엄 배너',
    price: 1200000,
    duration: 30,
    description: '가장 노출 수가 많은 배너입니다',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s',
  }
]

export default function New_ads() {
  return (
    <Col width={'fill'} gap={16}>
      <Typo.Title color={'variable'} emphasize>
        광고 추가하기
      </Typo.Title>
      <Col gap={24} width={'fill'}>
        {ads.map((v, i) => (
          <Ad key={i} {...v}/>
        ))}
      </Col>
    </Col>
  );
}

function Ad({
  img,
  name,
  price,
  description,
  duration
}: TAds_contents) {
  return (
    <Col gap={12} width={'fill'}>
      <div className={style.img_desc_container}>
        <div className={style.img_container}>
          <Image
            src={img}
            alt={'광고 예시 이미지'}
            fill
          />
        </div>
        <Col gap={8} width={'fill'}>
          <Col gap={4}>
            <Typo.Title emphasize color={'variable'}>
              {name}
            </Typo.Title>
            <Row gap={4}>
              <Typo.Body emphasize>
                {price.toLocaleString()}원
              </Typo.Body>
              <Typo.Body emphasize color={'variable'}>
                {duration}일
              </Typo.Body>
            </Row>
          </Col>
          <Typo.Contents width={'fill'} isPre={'wrap'}>
            {description}
          </Typo.Contents>
        </Col>
      </div>
      <BaseButton className={style.add_to_cart_button} onClick={() => {console.log('asds')}}>
        <CheckIcon/>
        <Typo.SubBody emphasize>바구니에 추가하기</Typo.SubBody>
      </BaseButton>
    </Col>
  );
}
