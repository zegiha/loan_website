'use client'
import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {semantic} from "@/shared/color";
import style from './premiumBannerAndCategoriesSelectionSection.module.scss';
import {BaseTextInput} from "@/components/molecules/inputs";
import React, {useEffect, useState} from "react";
import CloseIcon from "@/components/atoms/icons/CloseIcon";
import CategoryToggleButton from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";

type TCategory = {location: string, registeredNumber: number, active: boolean};
const CATEGORIES: Array<TCategory> = [
  { location: "전체", registeredNumber: 16804, active: true },
  { location: "서울", registeredNumber: 421, active: false },
  { location: "경기", registeredNumber: 853, active: false },
  { location: "인천", registeredNumber: 712, active: false },
  { location: "대전", registeredNumber: 328, active: false },
  { location: "대구", registeredNumber: 467, active: false },
  { location: "부산", registeredNumber: 902, active: false },
  { location: "광주", registeredNumber: 194, active: false },
  { location: "울산", registeredNumber: 375, active: false },
  { location: "세종", registeredNumber: 283, active: false },
  { location: "강원", registeredNumber: 612, active: false },
  { location: "충북", registeredNumber: 158, active: false },
  { location: "충남", registeredNumber: 789, active: false },
  { location: "전북", registeredNumber: 443, active: false },
  { location: "전남", registeredNumber: 534, active: false },
  { location: "경북", registeredNumber: 691, active: false },
  { location: "경남", registeredNumber: 824, active: false },
  { location: "제주", registeredNumber: 267, active: false },
];

export default function PremiumBannerAndCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [categories, setCategories] = useState<Array<{location: string, registeredNumber: number, active: boolean}>>([...CATEGORIES]);

  useEffect(() => {
    const newActiveCategories: Set<string> = new Set();
    categories.forEach((v) => {
      if(v.active) {
        newActiveCategories.add(v.location)
      }
    })
    setActiveCategoriesAction(new Set(newActiveCategories));
  }, [categories]);

  return (
    <Section>
      <Row gap={24} width={'fill'}>
        <Col gap={24} className={style.smallBox}>
          <Typo.SubBody color={'variable'} emphasize>
            <span className={semantic.onGenericOnGenericPrimary}>
              프리미엄
            </span>
            대부업체
          </Typo.SubBody>
          <PremiumBanner defaultCardNumber={1}/>
        </Col>
        <Col gap={16} className={style.bigBox}>
          <BaseTextInput
            placeholder={'찾으시는 지역을 입력해주세요'}
            size={'normal'}
            width={'fill'}
            maxWidth={280}
            value={locationSearch}
            TypingIcon={
            <div
              style={{
              width: 20, height: 20,
              cursor: 'pointer',
              }}
              onClick={() => setLocationSearch('')}
            >
              <CloseIcon size={20} color={'dim'}/>
            </div>
            }
            onChangeAction={(e) => {
              setLocationSearch(e.target.value);
            }}
          />
          <Row width={'fill'} gap={12} wrap>
            {categories.map((v, i) => (
              <CategoryToggleButton
                key={v.location}
                onClick={() => handleCategoryButton(i, v, setCategories)}
                active={v.active}
                contents={v.location}
                subContents={`${v.registeredNumber}개`}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}

function handleCategoryButton(
  i: number,
  v: TCategory,
  setCategories: React.Dispatch<React.SetStateAction<Array<TCategory>>>,
) {
  if(i === 0) {
    if(!v.active) {
      setCategories([...CATEGORIES]);
    }
  } else {
    setCategories(prev => {
      const newState = [...prev.map(
        (item, index) =>
          index === i ?
            {...item, active: !item.active} :
            index === 0 ?
              {...item, active: false} :
              item
      )];
      let cnt = 0;
      newState.forEach((v) => {
        if(v.active) {
          cnt++
        }
      })
      if(cnt === 0) {
        return [...CATEGORIES]
      }
      else return [...newState]
    })
  }
}
