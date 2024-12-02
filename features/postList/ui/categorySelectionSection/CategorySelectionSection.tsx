import React from "react";
import {Section} from "@/components/molecules";
import {Col, Divider, Row} from "@/components/atoms/layout";
import {TCategory} from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";
import useCategoryToggleButtons
  from "@/components/molecules/inputs/buttons/categoryToggleButton/useCategoryToggleButtons";
import style from './categorySelectionSection.module.scss';
import {CategoryToggleButton} from "@/components/molecules/inputs";

const LOANTYPE: Array<TCategory> = [
  {label: '전체', subLabel: 123, active: true},
  {label: '신용', subLabel: 123, active: false},
  {label: '담보', subLabel: 123, active: false},
]
const LOCATION: Array<TCategory> = [
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

export default function CategorySelectionSection({
  setActiveLoanTypeCategories,
  setActiveLocationCategories,
}: {
  setActiveLoanTypeCategories: React.Dispatch<React.SetStateAction<Set<string>>>,
  setActiveLocationCategories: React.Dispatch<React.SetStateAction<Set<string>>>
}) {
  const [loanTypeCategories, setLoanTypeCategories] = useCategoryToggleButtons(LOANTYPE, setActiveLoanTypeCategories)
  const [locationCategories, setLocationCategories] = useCategoryToggleButtons(LOCATION, setActiveLocationCategories);
  return (
    <Section>
      <Col width={'fill'} gap={16} className={style.container}>
        <Row width={'fill'} gap={12} wrap>
          {loanTypeCategories.map((v, i) => (
            <CategoryToggleButton
              key={`${v.label}-${i}`}
              handleCategoryButtonValues={{
                i,
                v,
                defaultValue: LOANTYPE,
                setCategories: setLoanTypeCategories,
              }}
              active={v.active}
              contents={v.label}
              subContents={`${v.subLabel}개`}
            />
          ))}
        </Row>
        <Divider/>
        <Row width={'fill'} gap={12} wrap>
          {locationCategories.map((v, i) => (
            <CategoryToggleButton
              key={`${v.label}-${i}`}
              handleCategoryButtonValues={{
                i,
                v,
                defaultValue: LOCATION,
                setCategories: setLocationCategories,
              }}
              active={v.active}
              contents={v.label}
              subContents={`${v.subLabel}개`}
            />
          ))}
        </Row>
      </Col>
    </Section>
  );
}
