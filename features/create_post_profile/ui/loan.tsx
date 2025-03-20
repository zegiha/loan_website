import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";
import {BaseButton, BaseTextInput, Radio} from "@/components/molecules/inputs";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import style from './style.module.scss'
import {ArrowIcon} from "@/components/atoms/icons";

export default function Create_post_loan({
  setStep
}: {setStep: React.Dispatch<React.SetStateAction<number>>}) {
  const {
    amount, setAmount,
  } = usePost_data()
  return (
    <InputSection title={'원하는 대출 정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <Typo.Caption color={'dim'}>지역정보</Typo.Caption>
        <select className={style.select}>
          <option value="">지역1</option>
          <option value="">지역2</option>
          <option value="">지역3</option>
          <option value="">지역4</option>
        </select>
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
        <select name="" id="" className={style.select}>
          <option value="">대출 종류</option>
        </select>
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
