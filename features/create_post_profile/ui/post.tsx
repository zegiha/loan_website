import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput} from "@/components/molecules/inputs";
import React from "react";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import CheckIcon from "@/components/atoms/icons/CheckIcon";
import style from './style.module.scss';
import {useLoanboardControllerCreate} from "@/entities/api/loanboard/loanboard";
import {ReloadIcon} from "@/components/atoms/icons";

export default function Create_post_post({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const data = usePost_data()

  const {
    title, setTitle,
    contents, setContents
  } = data

  const {
    mutate,
    status
  } = useLoanboardControllerCreate({
    mutation: {
      onSuccess: () => {
        setStep(p => p + 1)
      }
    }
  })

  return (
    <InputSection title={'게시물 정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <label htmlFor="">
          <Typo.Caption color={'dim'}>제목</Typo.Caption>
        </label>
        <BaseTextInput
          width={'fill'}
          size={'normal'}
          value={title}
          onChangeAction={(v) => setTitle(v)}
          placeholder={'제목을 입력해주세요'}
        />
      </Col>
      <Col gap={4} width={'fill'}>
        <label htmlFor="">
          <Typo.Caption color={'dim'}>문의내용</Typo.Caption>
        </label>
        <BaseTextInput
          inputType={'textarea'}
          width={'fill'}
          height={240}
          size={'normal'}
          value={contents}
          onChangeAction={(v) => setContents(v)}
          placeholder={'문의내용을 입력해주세요'}
        />
      </Col>
      <BaseButton
        className={style.button}
        onClick={() => {
          if(status === 'idle' || status === 'error') {
            mutate({
              data: {
                ...data,
                type: data.loan_type ?? '신용',
                // TODO available_location 전체로
                available_location: data.location !== '전체' && data.location !== null ? data.location : '서울',
                desired_amount: Number(data.amount.replaceAll(',', '')),
                age: Number(data.age),
                gender: data.gender,
                tel: data.phone_number.replaceAll('-',''),
                // TODO monthly_income string으로
                monthly_income: Number(data.monthly_income ?? '0'),
                job_status: data.has_job,
              },
            })
          }
        }}
        disabled={status === 'pending'}
      >
        {status === 'idle' && (
          <Row gap={4} alignItems={'center'}>
            <Typo.SubBody emphasize color={'onPrimary'}>완료</Typo.SubBody>
            <CheckIcon color={'white'}/>
          </Row>
        )}
        {status === 'error' && (
          <Row gap={4} alignItems={'center'}>
            <ReloadIcon color={'white'}/>
            <Typo.SubBody emphasize color={'onPrimary'}>다시시도</Typo.SubBody>
          </Row>
        )}
      </BaseButton>
    </InputSection>
  );
}
