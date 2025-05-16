'use client'
import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {useAdsPublicControllerFindAdCountByLocation} from '@/entities/api/advertisement-public/advertisement-public'
import {semantic_object} from "@/shared/color";
import {location_list} from '@/shared/constants'
import {TLocation} from '@/shared/type'
import style from './premiumBannerAndCategoriesSelectionSection.module.scss';
import React, {useEffect} from "react";
import CategoryToggleButton, {
  TCategory
} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";

const CATEGORIES: Array<TCategory> = [
  { label: "전체", subLabel: -1, active: true },
  { label: "서울", subLabel: -1, active: false },
  { label: "경기", subLabel: -1, active: false },
  { label: "인천", subLabel: -1, active: false },
  { label: "대전", subLabel: -1, active: false },
  { label: "대구", subLabel: -1, active: false },
  { label: "부산", subLabel: -1, active: false },
  { label: "광주", subLabel: -1, active: false },
  { label: "울산", subLabel: -1, active: false },
  { label: "세종", subLabel: -1, active: false },
  { label: "강원", subLabel: -1, active: false },
  { label: "충북", subLabel: -1, active: false },
  { label: "충남", subLabel: -1, active: false },
  { label: "전북", subLabel: -1, active: false },
  { label: "전남", subLabel: -1, active: false },
  { label: "경북", subLabel: -1, active: false },
  { label: "경남", subLabel: -1, active: false },
  { label: "제주", subLabel: -1, active: false },
];

export default function PremiumBannerAndCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [categories, setCategories] = useCategoryToggleButtons(CATEGORIES, setActiveCategoriesAction);
  const {
    data,
    status,
    refetch,
    isSuccess
  } = useAdsPublicControllerFindAdCountByLocation({
    query: {
      select: v => {
        let res: { [key in TLocation]: number } = location_list.reduce((acc, cur) => {
          acc[cur] = 0;
          return acc;
        }, {} as { [key in TLocation]: number });
        if(Array.isArray(v)) {
          v.forEach(v => {
            if(
              typeof v === 'object' &&
              'location' in v &&
              'count' in v
            ) {
              res[v.location as TLocation] = v.count as number
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
            subLabel: data[v.label as TLocation]
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
                key={v.label}
                handleCategoryButtonValues={{
                  i,
                  v,
                  setCategories,
                  defaultValue: CATEGORIES
                }}
                active={v.active}
                contents={v.label}
                subContents={
                v.subLabel === -1 ?
                  '로딩중' :
                  `${v.subLabel}개`
                }
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}

