import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {useRegister_data} from "@/features/register/context/register_data_context";
import React from "react";
import {ArrowAltIcon} from "@/components/atoms/icons";
import {formatting_phone_number, is_correct_id, is_correct_password, is_correct_phone_number} from "@/shared/helper";

export default function Register_generic_user_info({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    id, setId,
    password, setPassword,
    phone, setPhone,
  } = useRegister_data()

  const handleNext = () => {
    if(
      is_correct_id(id) === null &&
      is_correct_password(password) === null &&
      is_correct_phone_number(phone) === null
    ) {
      setStep(prev => prev + 1);
    }
  }

  return (
    <InputSection title={'회원가입 - 기본정보'}>
      <Col gap={32} width={'fill'}>
        <Col gap={16} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>
              아이디
            </Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={id}
              onChangeAction={(v) => setId(v)}
              checkError={[is_correct_id]}
              placeholder={'아이디를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>
              비밀번호
            </Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={password}
              onChangeAction={(v) => setPassword(v)}
              checkError={[is_correct_password]}
              placeholder={'비밀번호를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>
              전화번호
            </Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={phone}
              onChangeAction={(v) => setPhone(formatting_phone_number(v))}
              checkError={[is_correct_phone_number]}
              placeholder={'전화번호를 입력해주세요'}
            />
          </Col>
        </Col>
        <BaseButton
          className={button.primary_button36}
          onClick={() => handleNext()}
        >
          <Row gap={4} alignItems={'center'}>
            <Typo.Contents emphasize color={'onPrimary'}>
              다음
            </Typo.Contents>
            <ArrowAltIcon color={'white'}/>
          </Row>
        </BaseButton>
      </Col>
    </InputSection>
  );
}
