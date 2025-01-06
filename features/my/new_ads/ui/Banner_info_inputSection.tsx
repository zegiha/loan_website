import {Col} from "@/components/atoms/layout";
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import React from "react";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";

export default function Banner_info_inputSection() {
  const {
    title, setTitle,
    contents, setContents
  } = use_banner_info_context();
  return (
    <Col width={'fill'} alignItems={'center'} justifyContents={'center'}>
      <InputSection style={{width: '100%'}}>
        <Col gap={4} width={'fill'}>
          <Typo.Caption color={'dim'}>배너 제목</Typo.Caption>
          <BaseTextInput
            width={'fill'}
            size={'normal'}
            value={title}
            onChangeAction={(v) => setTitle(v)}
            placeholder={'제목을 입력해주세요'}
          />
        </Col>
        <Col gap={4} width={'fill'}>
          <Typo.Caption color={'dim'}>배너 내용</Typo.Caption>
          <BaseTextInput
            width={'fill'}
            inputType={'textarea'}
            size={'normal'}
            height={240}
            value={contents}
            onChangeAction={(v) => setContents(v)}
            placeholder={'내용을 입력해주세요'}
          />
        </Col>
      </InputSection>
    </Col>
  );
}
