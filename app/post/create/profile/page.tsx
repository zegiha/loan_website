'use client'

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col} from "@/components/atoms/layout";
import {BaseTextInput} from "@/components/molecules/inputs";
import {useState} from "react";
import Typo from "@/components/atoms/typo/Typo";

export default function Create_post_profile() {
  const [skehahffk, setSkehahffk] = useState("");
  return (
    <InputSection title={'신원정보를 입력해주세요'}>
      <Col gap={4} width={'fill'}>
        <label htmlFor="나도몰라">
          <Typo.Caption color={'dim'}>나도 몰라 시발!!</Typo.Caption>
        </label>
        <BaseTextInput
          width={'fill'}
          size={'normal'}
          value={skehahffk}
          onChangeAction={(e) => setSkehahffk(e.target.value)}
          placeholder={'나도몰라를 입력해주세요'}
        />
      </Col>
    </InputSection>
  );
}
