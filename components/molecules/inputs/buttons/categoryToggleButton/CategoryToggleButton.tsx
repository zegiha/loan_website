import {BaseButton} from "@/components/molecules/inputs";
import style from './categoryToggleButon.module.scss';
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";
import TLoan_production_type from "@/shared/type/TLoan_production_type";

interface IToggleButton {
  active?: boolean;
  contents: string;
  subContents: string;
  handleCategoryButtonValues?: IHandleCategoryButton,
  is_display?: boolean
}

interface IHandleCategoryButton {
  i: number,
  v: TCategory,
  setCategories: React.Dispatch<React.SetStateAction<Array<TCategory>>>,
  defaultValue: Array<TCategory>
}

export type TCategory = {label: TLoan_production_type, subLabel: number, active: boolean};

function handleCategoryButton({
  i,
  v,
  setCategories,
  defaultValue,
}: IHandleCategoryButton) {
  if(i === 0) {
    if(!v.active) {
      setCategories([...defaultValue]);
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
        return [...defaultValue]
      }
      else return [...newState]
    })
  }
}


export default function CategoryToggleButton({
  active=false,
  contents,
  subContents,
  handleCategoryButtonValues,
  is_display
}: IToggleButton) {
  return <BaseButton
    className={`${
      active ? style.activeContainer : style.container
    } ${style.transition}`}
    onClick={() => !is_display && handleCategoryButtonValues && handleCategoryButton({...handleCategoryButtonValues})}
  >
    <Col alignItems={'center'}>
      <Typo.Contents emphasize color={active ? 'onPrimary' : 'variable'}>
        {contents}
      </Typo.Contents>
      <Typo.Caption color={active ? 'onPrimaryDim' : 'dim'}>
        {subContents}
      </Typo.Caption>
    </Col>
  </BaseButton>;
}
