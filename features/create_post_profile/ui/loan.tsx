'use client'

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {TLocation} from '@/shared/type'
import React, {useState} from "react";
import {BaseButton, BaseTextInput, Radio} from "@/components/molecules/inputs";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import style from './style.module.scss'
import {ArrowIcon} from "@/components/atoms/icons";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list as rawLocationList} from "@/shared/constants";

const location_list: Array<Exclude<TLocation, '전체'>> = rawLocationList.filter(v => v !== '전체')

export default function Create_post_loan({
  setStep
}: {setStep: React.Dispatch<React.SetStateAction<number>>}) {
  const loan_type_list: Array<'신용' | '담보'> = ['신용', '담보']
  const {
    amount, setAmount,
    set_location,
    set_loan_type
  } = usePost_data()

  const [location_selected, set_location_selected] = useState<number | null>(null)
  const [loan_type_selected, set_loan_type_selected] = useState<number | null>(null)

  return (
    <InputSection title={'원하는 대출 정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <Typo.Caption color={'dim'}>대출 지역</Typo.Caption>
        <Select
          selected_idx={location_selected}
          set_selected_idx={idx => {
            set_location_selected(idx)
            if(idx !== null) set_location(location_list[idx])
          }}
          placeholder={'대출 지역을 선택해주세요'}
          option={location_list}
          max_option_item_show={4}
        />
      </Col>
      <Col gap={4} width={'fill'}>
        <Typo.Caption color={'dim'}>희망 금액</Typo.Caption>
        <Col gap={8} width={'fill'}>
          <Radio name={'amount'}>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              inputType={'number'}
              value={amount}
              onChangeAction={(v) => setAmount(v)}
              placeholder={'원하는 금액을 입력해주세요'}
            />
          </Radio>
          <Radio name={'amount'} contents={'상담 후 결정'} onFocus={() => setAmount('')}/>
        </Col>
      </Col>
      <Col width={'fill'}>
        <Typo.Caption color={'dim'}>대출 종류</Typo.Caption>
        <Select
          selected_idx={loan_type_selected}
          set_selected_idx={idx => {
            set_loan_type_selected(idx)
            if(idx !== null) set_loan_type(loan_type_list[idx])
          }}
          placeholder={'대출 종류를 선택해주세요'}
          option={loan_type_list}
        />
      </Col>
    <BaseButton className={style.button} onClick={() => {setStep(prev => prev + 1)}}>
        <Row gap={4} alignItems={'center'}>
          <Typo.SubBody emphasize color={'onPrimary'}>다음</Typo.SubBody>
          <ArrowIcon color={'white'}/>
        </Row>
      </BaseButton>
    </InputSection>
  )
}
