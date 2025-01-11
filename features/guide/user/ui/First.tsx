import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from "@/features/guide/user/ui/style.module.scss";
import Link from "next/link";
import CategoryToggleButton
  , {TCategory} from "../../../../components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import React from "react";

const CATEGORIES_LOCATIONS: Array<TCategory> = [
  { label: "전체", subLabel: 16804, active: true },
  { label: "서울", subLabel: 421, active: false },
  { label: "경기", subLabel: 853, active: false },
  { label: "인천", subLabel: 712, active: false },
  { label: "대전", subLabel: 328, active: false },
  { label: "대구", subLabel: 467, active: false },
  { label: "부산", subLabel: 902, active: false },
  { label: "광주", subLabel: 194, active: false },
  { label: "울산", subLabel: 375, active: false },
  { label: "세종", subLabel: 283, active: false },
  { label: "강원", subLabel: 612, active: false },
  { label: "충북", subLabel: 158, active: false },
  { label: "충남", subLabel: 789, active: false },
  { label: "전북", subLabel: 443, active: false },
  { label: "전남", subLabel: 534, active: false },
  { label: "경북", subLabel: 691, active: false },
  { label: "경남", subLabel: 824, active: false },
  { label: "제주", subLabel: 267, active: false },
];


const CATEGORIES_PRODUCTS: Array<TCategory> = [
  { label: "전체", subLabel: 16804, active: true },
  { label: "직장인대출", subLabel: 421, active: false },
  { label: "무직자대출", subLabel: 853, active: false },
  { label: "여성대출", subLabel: 712, active: false },
  { label: "개인돈대출", subLabel: 328, active: false },
  { label: "연체자대출", subLabel: 467, active: false },
  { label: "소액대출", subLabel: 902, active: false },
  { label: "무방문대출", subLabel: 194, active: false },
  { label: "월변대출", subLabel: 375, active: false },
  { label: "당일대출", subLabel: 283, active: false },
  { label: "사업자대출", subLabel: 612, active: false },
  { label: "일수대출", subLabel: 158, active: false },
  { label: "저신용자대출", subLabel: 789, active: false },
  { label: "신용대출", subLabel: 443, active: false },
  { label: "추가대출", subLabel: 534, active: false },
  { label: "자동차대출", subLabel: 691, active: false },
  { label: "부동산대출", subLabel: 824, active: false },
  { label: "24시대출", subLabel: 267, active: false },
  { label: "급전대출", subLabel: 324, active: false },
  { label: "일용직대출", subLabel: 410, active: false },
  { label: "프리랜서대출", subLabel: 578, active: false },
  { label: "전당포대출", subLabel: 681, active: false },
  { label: "신불자대출", subLabel: 729, active: false },
  { label: "주부대출", subLabel: 413, active: false },
  { label: "회생파산대출", subLabel: 522, active: false },
  { label: "대환대출", subLabel: 389, active: false },
  { label: "기타대출", subLabel: 146, active: false },
];

export default function First() {
  return (
    <Col width={'fill'} gap={24}>
      <Col width={'fill'}>
        <Typo.Title emphasize color={'primary'}>
          하나!
        </Typo.Title>
        <Typo.Title emphasize color={'variable'}>
          나에게 딱 맞는 업체 찾기
        </Typo.Title>
      </Col>
      <div className={style.eg_container}>
        <Link href={'/loan/location'} style={{width: '100%'}}>
          <Col gap={8} alignItems={'center'} width={'fill'} className={style.eg_item}>
            <Row width={'fill'} gap={12} wrap>
              {CATEGORIES_LOCATIONS.map((v, i) => (
                <CategoryToggleButton
                  key={v.label}
                  active={v.active}
                  contents={v.label}
                  subContents={`${v.subLabel}개`}
                  is_display
                />
              ))}
            </Row>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>지역별 업체 찾기</Typo.Contents>
              <div className={style.dot}/>
              <Typo.Contents color={'dim'}>눌러서 이동하기</Typo.Contents>
            </Row>
          </Col>
        </Link>
        <Link href={'/loan/product'} style={{width: '100%'}}>
          <Col gap={8} alignItems={'center'} width={'fill'} className={style.eg_item}>
            <Row width={'fill'} gap={12} wrap>
              {CATEGORIES_PRODUCTS.map((v, i) => (
                <CategoryToggleButton
                  key={v.label}
                  active={v.active}
                  contents={v.label}
                  subContents={`${v.subLabel}개`}
                  is_display
                />
              ))}
            </Row>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>상품별 업체 찾기</Typo.Contents>
              <div className={style.dot}/>
              <Typo.Contents color={'dim'}>눌러서 이동하기</Typo.Contents>
            </Row>
          </Col>
        </Link>
      </div>
      <Col>
        <Row gap={12}>
          <Link href={'/loan/location'}>
            <Typo.Body color={'primary'} underline className={style.primary_text}>
              지역별 업체 찾기
            </Typo.Body>
          </Link>
          <Link href={'/loan/product'}>
            <Typo.Body color={'primary'} underline className={style.primary_text}>
              상품별 업체 찾기
            </Typo.Body>
          </Link>
        </Row>
        <Typo.SubBody color={'dim'}>를 이용해서 고객님이 원하는 어떤 제품이든 빠르게 찾을 수 있어요!</Typo.SubBody>
      </Col>
    </Col>
  )
}
