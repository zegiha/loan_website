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
  const [age_d, set_age_d] = useState<string>('');
  const [gender_d, set_gender_d] = useState<string>('');
  const [phone_number_d, set_phone_number_d] = useState<string>('');
  const [has_job_d, set_has_job_d] = useState<boolean>(false);
  const {
    age, setAge,
    gender, setGender,
    phone_number, setPhone_number,
    has_job, setHas_job,
  } = !is_display ? usePost_data() : {
    age: age_d, setAge: set_age_d,
    gender: gender_d, setGender: set_gender_d,
    phone_number: phone_number_d, setPhone_number: set_phone_number_d,
    has_job: has_job_d, setHas_job: set_has_job_d,
  }

  return (
    <InputSection title={'신원정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <label htmlFor="gender">
          <Typo.Caption color={'dim'}>성별</Typo.Caption>
        </label>
        <Col width={'fill'} gap={8}>
          <Radio name={'gender'} contents={'남성'}/>
          <Radio name={'gender'} contents={'여성'}/>
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
