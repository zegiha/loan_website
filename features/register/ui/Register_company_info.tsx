import {useRegister_data} from "@/features/register/context/register_data_context";
import React from "react";
import {error_checker, formatting_phone_number, is_correct_phone_number, is_typed} from "@/shared/helper";
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import CheckIcon from "@/components/atoms/icons/CheckIcon";

export default function Register_company_info({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    company_location, setCompany_location,
    company_phone, setCompany_phone,
    company_name, setCompany_name,
  } = useRegister_data()

  const handleNext = () => {
    if(
      error_checker([is_typed], company_name) === null &&
      error_checker([is_typed, is_correct_phone_number], company_phone) === null &&
      error_checker([is_typed], company_location) === null
    ) {
      setStep(prev => prev + 1)
    } else {
      alert('잘못된 입력 값이 존재합니다')
    }
  }

  return (
    <InputSection title={'회원가입 - 업체정보'}>
      <Col gap={32} width={'fill'}>
        <Col gap={16} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              업체명
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={company_name}
              onChangeAction={v => setCompany_name(v)}
              checkError={[is_typed]}
              placeholder={'업체명을 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              업체 연락처
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={company_phone}
              onChangeAction={v => setCompany_phone(formatting_phone_number(v))}
              checkError={[is_typed, is_correct_phone_number]}
              placeholder={'업체 연락처를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              소재지
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={company_location}
              onChangeAction={v => setCompany_location(v)}
              checkError={[is_typed]}
              placeholder={'소재지를 입력해주세요'}
            />
          </Col>
        </Col>
        <Row width={'fill'} gap={12}>
          <BaseButton
            className={`${button.grayButton36} ${button.one_third_width}`}
            onClick={() => setStep(prev => prev - 1)}
          >
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>
                이전
              </Typo.Contents>
            </Row>
          </BaseButton>
          <BaseButton
            className={`${button.primary_button36} ${button.two_third_width}`}
            onClick={() => handleNext()}
          >
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents emphasize color={'onPrimary'}>
                완료
              </Typo.Contents>
              <CheckIcon color={'white'} />
            </Row>
          </BaseButton>
        </Row>
      </Col>
    </InputSection>
  );
}
