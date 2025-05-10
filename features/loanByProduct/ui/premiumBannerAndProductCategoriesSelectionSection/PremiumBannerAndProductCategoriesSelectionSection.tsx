'use client'

import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import {semantic_object} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {CategoryToggleButton} from "@/components/molecules/inputs";
import React from "react";
import style from './premiumBannerAndProductCategoriesSelectionSection.module.scss';
import {TCategory} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";

const CATEGORIES: Array<TCategory> = [
  {label: '전체', subLabel: 12656, active: true},
  {label: '직장인대출', subLabel: 70, active: false},
  {label: '무직자대출', subLabel: 87, active: false},
  {label: '여성대출', subLabel: 747, active: false},
  {label: '개인돈대출', subLabel: 113, active: false},
  {label: '연체자대출', subLabel: 952, active: false},
  {label: '소액대출', subLabel: 215, active: false},
  {label: '무방문대출', subLabel: 185, active: false},
  {label: '월변대출', subLabel: 84, active: false},
  {label: '당일대출', subLabel: 91, active: false},
  {label: '사업자대출', subLabel: 906, active: false},
  {label: '일수대출', subLabel: 489, active: false},
  {label: '저신용자대출', subLabel: 308, active: false},
  {label: '신용대출', subLabel: 895, active: false},
  {label: '추가대출', subLabel: 595, active: false},
  {label: '자동차대출', subLabel: 510, active: false},
  {label: '부동산대출', subLabel: 34, active: false},
  {label: '24시대출', subLabel: 768, active: false},
  {label: '급전대출', subLabel: 514, active: false},
  {label: '일용직대출', subLabel: 835, active: false},
  {label: '프리랜서대출', subLabel: 280, active: false},
  {label: '전당포대출', subLabel: 967, active: false},
  {label: '신불자대출', subLabel: 72, active: false},
  {label: '주부대출', subLabel: 965, active: false},
  {label: '회생파산대출', subLabel: 720, active: false},
  {label: '대환대출', subLabel: 588, active: false},
  {label: '기타대출', subLabel: 489, active: false},
]

export default function PremiumBannerAndProductCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [categories, setCategories] = useCategoryToggleButtons(CATEGORIES, setActiveCategoriesAction)
  return (
    <Section>
      <Row gap={24} width={'fill'} className={style.allSection}>
        <Col gap={24} className={style.smallBox}>
          <Typo.SubBody color={'variable'} emphasize>
            <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
              프리미엄
            </span>
            대부업체
          </Typo.SubBody>
          <PremiumBanner defaultCardNumber={3}/>
        </Col>
        <Col gap={16} className={style.bigBox}>
          <Row width={'fill'} gap={12} wrap>
            {categories.map((v, i) => (
              <CategoryToggleButton
                key={`${v.label}-${i}`}
                handleCategoryButtonValues={{
                  i,
                  v,
                  defaultValue: CATEGORIES,
                  setCategories
                }}
                active={v.active}
                contents={v.label}
                subContents={`${v.subLabel.toLocaleString('ko-kr')}개`}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}
