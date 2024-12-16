import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, Radio} from "@/components/molecules/inputs";
import {ArrowIcon} from "@/components/atoms/icons";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import React from "react";
import style from './style.module.scss'

export default function Create_post_profile({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    age, setAge,
    gender, setGender,
    phone_number, setPhone_number,
    has_job, setHas_job,
  } = usePost_data()

  const handle_phone_number = (text: string) => {
    // 숫자만 추출
    const onlyNumbers = text.replace(/[^0-9]/g, "");

    // 최대 길이 제한 (11자리까지만 허용)
    const trimmedNumbers = onlyNumbers.slice(0, 11);

    // 번호 형식으로 실시간 변환
    let formattedNumber = trimmedNumbers;
    if (trimmedNumbers.length <= 3) {
      formattedNumber = trimmedNumbers; // 010
    } else if (trimmedNumbers.length <= 7) {
      formattedNumber = trimmedNumbers.replace(/(\d{3})(\d{1,4})/, "$1-$2"); // 010-1234
    } else {
      formattedNumber = trimmedNumbers.replace(
        /(\d{3})(\d{4})(\d{1,4})/,
        "$1-$2-$3"
      ); // 010-1234-5678
    }

    // 결과 저장
    setPhone_number(formattedNumber);
  };

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
          onChangeAction={(v) => setAge(v)}
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
          onChangeAction={(v) => handle_phone_number(v)}
          placeholder={'연락처를 입력해주세요'}
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
