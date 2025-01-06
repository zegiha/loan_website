import style from "@/features/my/new_ads/ui/style.module.scss";
import Typo from "@/components/atoms/typo/Typo";
import {ArrowAltIcon} from "@/components/atoms/icons";
import React from "react";
import {TStep} from "@/features/my/new_ads/type";
import {Col, Row} from "@/components/atoms/layout";
import {BaseButton} from "@/components/molecules/inputs";

export default function Subject_section({
  step,
  setStepAction
}: {
  step: TStep
  setStepAction?: React.Dispatch<React.SetStateAction<TStep>>
}) {
  const handleBack = () => {
    switch (step) {
      case 'buy': {
        if(setStepAction) {
          window.scrollTo({top: 0});
          setStepAction('get');
        }
      }
    }
  }

  return (
    <Col gap={12}>
      {setStepAction && <BaseButton
        className={style.back_button}
        onClick={handleBack}
      >
        <Row gap={4}>
          <ArrowAltIcon color={'dim'} deg={180}/>
          <Typo.Contents color={'dim'}>돌아가기</Typo.Contents>
        </Row>
      </BaseButton>}
      <div className={style.title_section}>
        <Contents contents_step={'get'} current_step={step}>
          광고 추가하기
        </Contents>
        <ArrowAltIcon color={'dim'}/>
        <Contents contents_step={'buy'} current_step={step}>
          구매하기
        </Contents>
        <ArrowAltIcon color={'dim'}/>
        <Contents contents_step={'end'} current_step={step}>
          완료
        </Contents>
      </div>
    </Col>
  );
}

function Contents({
  contents_step,
  current_step,
  children,
}: {
  current_step: TStep,
  contents_step: TStep,
  children: React.ReactNode
}) {
  if (current_step === contents_step) {
    return <Typo.Body color={'variable'} emphasize>{children}</Typo.Body>
  } else {
    return <Typo.Contents color={'dim'}>{children}</Typo.Contents>
  }
}
