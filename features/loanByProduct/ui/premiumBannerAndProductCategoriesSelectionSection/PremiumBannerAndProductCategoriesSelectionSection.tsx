'use client'

import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {BaseTextInput, CategoryToggleButton} from "@/components/molecules/inputs";
import {CloseIcon} from "@/components/atoms/icons";
import React, {useState} from "react";
import style from './premiumBannerAndProductCategoriesSelectionSection.module.scss';
import {TCategory} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";

const CATEGORIES: Array<TCategory> = [
  {label: '전체', subLabel: 2037, active: true},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
  {label: '직장인대출', subLabel: 230, active: false},
];

export default function PremiumBannerAndProductCategoriesSelectionSection({
  setActiveCategoriesAction
}: {setActiveCategoriesAction: React.Dispatch<React.SetStateAction<Set<string>>>}) {
  const [productSearch, setProductSearch] = useState<string>('');
  const [categories, setCategories] = useCategoryToggleButtons(CATEGORIES, setActiveCategoriesAction)
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
            value={productSearch}
            TypingIcon={
            <div
              style={{
              width: 20, height: 20,
              cursor: 'pointer',
              }}
              onClick={() => setProductSearch('')}
            >
              <CloseIcon size={20} color={'dim'}/>
            </div>
            }
            onChangeAction={(v) => {
              setProductSearch(v);
            }}
          />
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
                subContents={`${v.subLabel}개`}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Section>
  );
}
