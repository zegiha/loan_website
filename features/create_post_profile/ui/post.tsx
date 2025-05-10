import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput} from "@/components/molecules/inputs";
import React from "react";
import {usePost_data} from "@/features/create_post_profile/context/post_data_context";
import CheckIcon from "@/components/atoms/icons/CheckIcon";
import style from './style.module.scss';

export default function Create_post_post({
  setStep,
  test,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  test: () => Promise<boolean>
}) {
  const {
    title, setTitle,
    contents, setContents
  } = usePost_data()

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
      <BaseButton className={style.button} onClick={() => {
        test().then(res => {
          if(res) {
            setStep(prev => prev + 1)
          }
        })
      }}>
        <Row gap={4} alignItems={'center'}>
          <Typo.SubBody emphasize color={'onPrimary'}>완료</Typo.SubBody>
          <CheckIcon color={'white'}/>
        </Row>
      </BaseButton>
    </InputSection>
  );
}
