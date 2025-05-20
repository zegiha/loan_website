'use client'

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {useRegister_data} from "@/features/register/context/register_data_context";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import {
  error_checker,
  formatting_phone_number,
  is_correct_phone_number,
  is_typed
} from "@/shared/helper";
import React from "react";
import {ArrowAltIcon, Upload_icon} from "@/components/atoms/icons";

export default function Register_brokerage_info({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    brokerage_number, setBrokerage_number,
    loan_advertisement_phone, set_loan_advertisement_phone,
    brokerage_period, setBrokerage_period,
    brokerage_registrar, setBrokerage_registrar,
    brokerage_registration_certificate, setBrokerage_registration_certificate,
    business_registration_certificate, set_business_registration_certificate,
  } = useRegister_data()

  const getDate = (date: Date) => {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`
  }

  const periodChecker = (start: Date, end: Date) => {
    return start.getTime() > end.getTime()
      ? '시작일은 종료일보다 이릅니다' : null
  }

  const handleNext = () => {
    if(
      error_checker([is_typed], brokerage_number) === null &&
      error_checker([is_correct_phone_number], loan_advertisement_phone) === null &&
      error_checker([is_typed], brokerage_period.start?.toString()) === null &&
      error_checker([is_typed], brokerage_period.end?.toString()) === null &&
      error_checker([is_typed], brokerage_registrar) === null &&
      brokerage_registration_certificate !== null &&
      business_registration_certificate !== null
    ) {
      if(periodChecker(brokerage_period.start!, brokerage_period.end!) === null) {
        window.scrollTo({top: 0})
        setStep(prev => prev + 1)
      } else {
        alert(periodChecker(brokerage_period.start!, brokerage_period.end!))
      }
    } else {
      alert('잘못된 입력이 있습니다')
    }
  }

  return (
    <InputSection title={'회원가입 - 대부업정보'} isForm>
      <Col gap={32} width={'fill'}>
        <Col gap={16} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              대부 (중개) 등록번호
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={brokerage_number}
              onChangeAction={v => setBrokerage_number(v)}
              checkError={[is_typed]}
              placeholder={'대부업 등록증의 번호를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>
              대출광고 전화번호
            </Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={loan_advertisement_phone}
              onChangeAction={v => set_loan_advertisement_phone(formatting_phone_number(v))}
              checkError={[is_correct_phone_number]}
              placeholder={'대출광고 전화번호를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>등록 유효기간</Typo.Contents>
            <Row gap={12} width={'fill'}>
              <BaseTextInput
                width={'fill'}
                inputType={'date'}
                value={brokerage_period.start === null ? '' : getDate(brokerage_period.start)}
                size={'normal'}
                onChangeAction={v => setBrokerage_period(prev => ({...prev, start: new Date(v)}))}
                checkError={[is_typed]}
              />
              <BaseTextInput
                width={'fill'}
                inputType={'date'}
                value={brokerage_period.end === null ? '' : getDate(brokerage_period.end)}
                size={'normal'}
                onChangeAction={v => setBrokerage_period(prev => ({...prev, end: new Date(v)}))}
                checkError={[is_typed]}
              />
            </Row>
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>등록 기관</Typo.Contents>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={brokerage_registrar}
              onChangeAction={v => setBrokerage_registrar(v)}
              checkError={[is_typed]}
              placeholder={'등록기관을 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>대부업 등록증 파일</Typo.Contents>
            <File_input
              set_data={setBrokerage_registration_certificate}
              placeholder={`대부업 등록증 파일을 올리거나\n이 박스를 눌러 선택해주세요`}
              placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>사업자 등록증 파일</Typo.Contents>
            <File_input
              set_data={set_business_registration_certificate}
              placeholder={`사업자 등록증 파일을 올리거나\n이 박스를 눌러 선택해주세요`}
              placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
            />
          </Col>
        </Col>
        <Row width={'fill'} gap={12}>
          <BaseButton
            className={`${button.grayButton36} ${button.one_third_width}`}
            onClick={() => {
              window.scrollTo({top: 0})
              setStep(prev => prev - 1)
            }}
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
                다음
              </Typo.Contents>
              <ArrowAltIcon color={'white'}/>
            </Row>
          </BaseButton>
        </Row>
      </Col>
    </InputSection>
  );
}
