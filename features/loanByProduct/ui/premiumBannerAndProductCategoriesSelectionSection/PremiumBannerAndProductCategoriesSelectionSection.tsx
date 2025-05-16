'use client'

import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import {
  useAdsPublicControllerFindAdCountByLocation,
  useAdsPublicControllerFindAdCountByProductType
} from '@/entities/api/advertisement-public/advertisement-public'
import {semantic_object} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {CategoryToggleButton} from "@/components/molecules/inputs";
import {loan_production_list} from '@/shared/constants'
import TLoan_production_type from '@/shared/type/TLoan_production_type'
import React, {useEffect} from "react";
import style from './premiumBannerAndProductCategoriesSelectionSection.module.scss';
import {TCategory} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";
import { TLocation } from "@/shared/type";

const CATEGORIES: Array<TCategory> = [
  {label: '전체', subLabel: -1, active: true},
  {label: '직장인대출', subLabel: -1, active: false},
  {label: '무직자대출', subLabel: -1, active: false},
  {label: '여성대출', subLabel: -1, active: false},
  {label: '개인돈대출', subLabel: -1, active: false},
  {label: '연체자대출', subLabel: -1, active: false},
  {label: '소액대출', subLabel: -1, active: false},
  {label: '무방문대출', subLabel: -1, active: false},
  {label: '월변대출', subLabel: -1, active: false},
  {label: '당일대출', subLabel: -1, active: false},
  {label: '사업자대출', subLabel: -1, active: false},
  {label: '일수대출', subLabel: -1, active: false},
  {label: '저신용자대출', subLabel: -1, active: false},
  {label: '신용대출', subLabel: -1, active: false},
  {label: '추가대출', subLabel: -1, active: false},
  {label: '자동차대출', subLabel: -1, active: false},
  {label: '부동산대출', subLabel: -1, active: false},
  {label: '24시대출', subLabel: -1, active: false},
  {label: '급전대출', subLabel: -1, active: false},
  {label: '일용직대출', subLabel: -1, active: false},
  {label: '프리랜서대출', subLabel: -1, active: false},
  {label: '전당포대출', subLabel: -1, active: false},
  {label: '신불자대출', subLabel: -1, active: false},
  {label: '주부대출', subLabel: -1, active: false},
  {label: '회생파산대출', subLabel: -1, active: false},
  {label: '대환대출', subLabel: -1, active: false},
  {label: '기타대출', subLabel: -1, active: false},
]


export default function PremiumBannerAndProductCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [categories, setCategories] = useCategoryToggleButtons(CATEGORIES, setActiveCategoriesAction);
  const {
    data,
    status,
    refetch,
    isSuccess
  } = useAdsPublicControllerFindAdCountByProductType({
    query: {
      select: v => {
        let res: { [key in TLoan_production_type]: number } = loan_production_list.reduce((acc, cur) => {
          acc[cur] = 0;
          return acc;
        }, {} as { [key in TLoan_production_type]: number });
        if(Array.isArray(v)) {
          v.forEach(v => {
            if(
              typeof v === 'object' &&
              'product_type' in v &&
              'count' in v
            ) {
              res[v.product_type as TLoan_production_type] = v.count as number
            }
          })
        }
        return res
      }
    }
  })

  useEffect(() => {
    if(status === 'success') {
      setCategories(prev => {
        const res: Array<TCategory> = []

        prev.forEach(v => {
          res.push({
            ...v,
            subLabel: data[v.label as TLoan_production_type]
          })
        })

        return [...res]
      })
    }
  }, [isSuccess])

  useEffect(() => {
    refetch()
  }, [categories]);

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
                subContents={
                v.subLabel === -1 ?
                  '로딩중' :
                  `${v.subLabel.toLocaleString('ko-kr')}개`
                }
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}
