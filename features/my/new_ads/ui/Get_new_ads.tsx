'use client'

import {Col} from "@/components/atoms/layout";
import React from "react";
import {TStep} from "@/features/my/new_ads/type";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import get_ads from "@/features/my/new_ads/api/get_ads";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Ad from "@/features/my/new_ads/ui/Ad";
import Bottom_bar from "@/features/my/new_ads/ui/Bottom_bar";

export default function Get_new_ads({
  setStepAction
}: {
  setStepAction: React.Dispatch<React.SetStateAction<TStep>>
}) {
  const ads = get_ads();

  const {select, setSelect} = useSelect_context();

  const handle_ad_click = (ad_name: string) => {
    setSelect(prev => {
      const has = prev.includes(ad_name)
      if(has) {
        return prev.filter(e => e !== ad_name)
      } else {
        return [...prev, ad_name]
      }
    })
  }

  return (
    <Col width={'fill'} gap={16}>
      <Subject_section step={'get'}/>
      <Col width={'fill'} gap={64}>
        <Col gap={128} width={'fill'}>
          {ads.map((v, i) => (
            <Ad
              key={i}
              onClick={() => handle_ad_click(v.name)}
              active={select.findIndex((e) => v.name === e) !== -1}
              {...v}
            />
          ))}
        </Col>
        <Bottom_bar
          onBuyClick={() => {
            window.scrollTo({
              top: 0
            });
            setStepAction('buy')
          }}
        />
      </Col>
    </Col>
  );
}
