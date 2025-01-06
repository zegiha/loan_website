'use client'

import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/features/my/ui/Section_wrapper";
import React, {useState} from "react";
import {Select_context} from "@/features/my/new_ads/context/select_context";
import {TStep} from "@/features/my/new_ads/type";
import Get_new_ads from "@/features/my/new_ads/ui/Get_new_ads";
import Buy_new_ads from "@/features/my/new_ads/ui/Buy_new_ads";
import End_new_ads from "@/features/my/new_ads/ui/End_new_ads";

export default function My_ads_new() {
  const [select, setSelect] = useState<Array<string>>([])
  const [step, setStep] = useState<TStep>('get')

  return (
    <Col width={'fill'}>
      <Section_wrapper>
        <Select_context.Provider value={{select, setSelect}}>
          {Switcher(step, setStep)}
        </Select_context.Provider>
      </Section_wrapper>
    </Col>
  );
}

function Switcher(step: TStep, setStep: React.Dispatch<React.SetStateAction<TStep>>) {
  const props = {
    setStepAction: setStep
  }
  switch (step) {
    case 'get': return <Get_new_ads {...props} />;
    case 'buy': return <Buy_new_ads {...props} />;
    case 'end': return <End_new_ads/>;
  }
}
