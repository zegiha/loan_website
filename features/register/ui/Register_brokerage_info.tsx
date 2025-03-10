'use client'

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {useRegister_data} from "@/features/register/context/register_data_context";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {
  error_checker,
  formatting_phone_number,
  is_correct_phone_number,
  is_typed
} from "@/shared/helper";
import React, {useState} from "react";
import {ArrowAltIcon, Upload_icon} from "@/components/atoms/icons";
import style from './style.module.scss'

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

  const [brokerage_prev_img, set_brokerage_prev_img] = useState<string | ArrayBuffer | null>(null);
  const [business_prev_img, set_business_prev_img] = useState<string | ArrayBuffer | null>(null);

  const getDate = (date: Date) => {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`
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
      setStep(prev => prev + 1)
    } else {
      alert('잘못된 입력이 있습니다')
    }
  }

  return (
    <InputSection title={'회원가입 - 대부업정보'}>
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
            <div className={style.input_file_container}>
              <input
                className={style.input_file}
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if(file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    setBrokerage_registration_certificate(file)
                    reader.onload = () => set_brokerage_prev_img(reader.result)
                  }
                }}
              />
              <Col
                className={style.input_file_placeholder}
                justifyContents={'center'}
                alignItems={'center'}
                gap={4}
              >
                {brokerage_prev_img ? (
                  <img
                    className={style.input_file_prev_img}
                    src={brokerage_prev_img.toString()}
                    alt="brokerage prev img"
                  />
                ): (
                  <>
                    <Upload_icon color={'dim'} size={64}/>
                    <Typo.Caption
                      color={'dim'}
                      width={'hug'}
                      textAlign={'center'}
                      isPre
                    >
                      {`대부업 등록증 파일을 올리거나\n이 박스를 눌러 선택해주세요`}
                    </Typo.Caption>
                  </>
                )}
              </Col>
            </div>
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Contents color={'dim'}>대부업 등록증 파일</Typo.Contents>
            <div className={style.input_file_container}>
              <input
                className={style.input_file}
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if(file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    set_business_registration_certificate(file);
                    reader.onload = () => set_business_prev_img(reader.result)
                  }
                }}
              />
              <Col
                className={style.input_file_placeholder}
                justifyContents={'center'}
                alignItems={'center'}
                gap={4}
              >
                {business_prev_img ? (
                  <img
                    className={style.input_file_prev_img}
                    src={business_prev_img.toString()}
                    alt="business prev img"
                  />
                ): (
                  <>
                    <Upload_icon color={'dim'} size={64}/>
                    <Typo.Caption
                      color={'dim'}
                      width={'hug'}
                      textAlign={'center'}
                      isPre
                    >
                      {`사업자 등록증 파일을 올리거나\n이 박스를 눌러 선택해주세요`}
                    </Typo.Caption>
                  </>
                )}
              </Col>
            </div>
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
