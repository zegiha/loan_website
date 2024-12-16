'use client'
import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {semantic} from "@/shared/color";
import style from './premiumBannerAndCategoriesSelectionSection.module.scss';
import {BaseTextInput} from "@/components/molecules/inputs";
import React, {useState} from "react";
import CloseIcon from "@/components/atoms/icons/CloseIcon";
import CategoryToggleButton, {
  TCategory
} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";

const CATEGORIES: Array<TCategory> = [
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

export default function PremiumBannerAndCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [categories, setCategories] = useCategoryToggleButtons(CATEGORIES, setActiveCategoriesAction);

  return (
    <Section>
      <Row gap={24} width={'fill'} className={style.allSection}>
        <Col gap={24} className={style.smallBox}>
          <Typo.SubBody color={'variable'} emphasize>
            <span className={semantic.onGenericOnGenericPrimary}>
              프리미엄
            </span>
            대부업체
          </Typo.SubBody>
          <PremiumBanner defaultCardNumber={3}/>
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
            onChangeAction={(v) => {
              setLocationSearch(v);
            }}
          />
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
                subContents={`${v.subLabel}개`}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}

