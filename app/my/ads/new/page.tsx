'use client'

import {Col} from "@/components/atoms/layout";
import React, {useState} from "react";
import {Select_context} from "@/features/my/new_ads/context/select_context";
import {TStep} from "@/features/my/new_ads/type";
import Get_new_ads from "@/features/my/new_ads/ui/get_new/Get_new_ads";
import Buy_new_ads from "@/features/my/new_ads/ui/buy_new/Buy_new_ads";
import End_new_ads from "@/features/my/new_ads/ui/End_new_ads";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import my_navigations from "@/features/my/lib/my_navigations";
import {TAds_name, TAds_type} from "@/shared/type";

export default function My_ads_new() {
  const [select, setSelect] = useState<Array<{type_name: TAds_type, name: TAds_name, price: number}>>([])
  const [step, setStep] = useState<TStep>('get')

  return (
    <Col width={'fill'}>
      <Section_wrapper title={'마이페이지'} navigations={my_navigations}>
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
