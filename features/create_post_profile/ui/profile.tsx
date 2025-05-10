import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, Radio} from "@/components/molecules/inputs";
import {ArrowIcon} from "@/components/atoms/icons";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import React, {useState} from "react";
import style from './style.module.scss'
import {formatting_phone_number} from "@/shared/helper";

export default function Create_post_profile({
  setStep,
  is_display
}: {
  setStep?: React.Dispatch<React.SetStateAction<number>>,
  is_display?: boolean
}) {
  const [string_tmp, set_string_tmp] = useState<string>('');
  const [string_with_null_tmp, set_string_with_null_tmp] = useState<string | null>(null);
  const [_, set_bool_tmp] = useState<boolean>(false);
  const {
    age, setAge,
    setGender,
    phone_number, setPhone_number,
    setHas_job,
    monthly_income, set_monthly_income,
  } = !is_display ? usePost_data() : {
    age: string_tmp, setAge: set_string_tmp,
    setGender: set_string_tmp,
    phone_number: string_tmp, setPhone_number: set_string_tmp,
    setHas_job: set_bool_tmp,
    monthly_income: string_with_null_tmp, set_monthly_income: set_string_with_null_tmp
  }

  return (
    <InputSection title={'신원정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <label htmlFor="gender">
          <Typo.Caption color={'dim'}>성별</Typo.Caption>
        </label>
        <Col width={'fill'} gap={8}>
          <Radio name={'gender'} contents={'남성'} onFocus={() => !is_display && setGender('MALE')}/>
          <Radio name={'gender'} contents={'여성'} onFocus={() => !is_display && setGender('FEMALE')}/>
        </Col>
      </Col>
      <Col gap={4} width={'fill'}>
        <label htmlFor="age">
          <Typo.Caption color={'dim'}>나이</Typo.Caption>
        </label>
        <BaseTextInput
          inputType={'number'}
          width={'fill'}
          size={'normal'}
          value={age}
          onChangeAction={(v) => !is_display && setAge(v)}
          placeholder={'나이를 입력해주세요'}
        />
      </Col>
      <Col gap={4} width={'fill'}>
        <label htmlFor="phone_number">
          <Typo.Caption color={'dim'}>연락처</Typo.Caption>
        </label>
        <BaseTextInput
          width={'fill'}
          size={'normal'}
          value={phone_number}
          onChangeAction={(v) => !is_display && setPhone_number(formatting_phone_number(v))}
          placeholder={'연락처를 입력해주세요'}
        />
      </Col>
      <Col gap={4} width={'fill'}>
        <label htmlFor="gender">
          <Typo.Caption color={'dim'}>직업유무</Typo.Caption>
        </label>
        <Col width={'fill'} gap={8}>
          <Radio name={'has_job'} contents={'예'} onFocus={() => !is_display && setHas_job(true)}/>
          <Radio name={'has_job'} contents={'아니요'} onFocus={() => !is_display && setHas_job(false)}/>
        </Col>
      </Col>
      <Col gap={4} width={'fill'}>
        <label htmlFor="gender">
          <Typo.Caption color={'dim'}>월수입</Typo.Caption>
        </label>
        <Col width={'fill'} gap={8}>
          <Radio name={'monthly_income'}>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={monthly_income !== null ? monthly_income : ''}
              TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
              onChangeAction={(v) => !is_display && set_monthly_income(v)}
              placeholder={'월수입을 입력해주세요'}
            />
          </Radio>
          <Radio name={'monthly_income'} contents={'수입없음'} onFocus={() => !is_display && set_monthly_income(null)}/>
        </Col>
      </Col>
      <BaseButton className={style.button} onClick={() => {
        if(!is_display && setStep) {
          setStep(prev => prev + 1)
        }
      }}>
        <Row gap={4} alignItems={'center'}>
          <Typo.SubBody emphasize color={'onPrimary'}>다음</Typo.SubBody>
          <ArrowIcon color={'white'}/>
        </Row>
      </BaseButton>
    </InputSection>
  )
}
