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
    let sw = true
    if(sw) setId(prev => {
      sw = is_correct_id(prev) && sw;
      return prev
    })
    if(sw) setPassword(prev => {
      sw = is_correct_password(prev) && sw;
      return prev;
    })
    if(sw) setPhone(prev => {
      sw = is_correct_phone_number(prev) && sw;
      return prev;
    })
    if(sw) {
      setStep(prev => prev + 1)
    }
  }

  return (
    <InputSection title={'계정정보를 입력해주세요'}>
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
