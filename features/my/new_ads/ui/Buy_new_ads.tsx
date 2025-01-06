'use client'

import React, {useEffect, useState} from "react";
import {TStep} from "@/features/my/new_ads/type";
import {Col} from "@/components/atoms/layout";
import {Banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Banner_info_inputSection from "@/features/my/new_ads/ui/Banner_info_inputSection";
import Selected_ads from "@/features/my/new_ads/ui/Selected_ads";
import Buy_table_section from "@/features/my/new_ads/ui/Buy_table_section";
import {BaseButton, button} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";

export default function Buy_new_ads({
  setStepAction
}: {
  setStepAction: React.Dispatch<React.SetStateAction<TStep>>
}) {

  const [depositor, setDepositor] = useState<string>('')

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const default_value = {
    title, setTitle,
    contents, setContents,
  }

  const handleSubmit = () => {
    if(title === '') {
      alert('배너 제목을 입력해주세요')
    } else if(contents === '') {
      alert('배너 내용을 입력해주세요')
    } else if(depositor === '') {
      alert('예금자명을 입력해주세요')
    } else {
      window.scrollTo({top: 0})
      setStepAction('end');
    }
  }

  const {select} = useSelect_context()
  useEffect(() => {
    if(select.length === 0) {
      setStepAction('get')
    }
  }, [select]);

  return (
    <Col gap={16} width={'fill'}>
      <Subject_section step={'buy'} setStepAction={setStepAction}/>
      <Col gap={32} width={'fill'}>
        <Banner_info_context.Provider value={default_value}>
          <Banner_info_inputSection/>
        </Banner_info_context.Provider>
        <Col gap={16} width={'fill'}>
          <Selected_ads/>
          <Banner_info_context.Provider value={default_value}>
            <Buy_table_section
              depositor={depositor}
              setDepositor={setDepositor}
            />
          </Banner_info_context.Provider>
        </Col>
        <BaseButton
          className={button.primary_button44}
          onClick={handleSubmit}
        >
          <Typo.SubBody color={'onPrimary'} emphasize>
            완료
          </Typo.SubBody>
        </BaseButton>
      </Col>
    </Col>
  );
}
