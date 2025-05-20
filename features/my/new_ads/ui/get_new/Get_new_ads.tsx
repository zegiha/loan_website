'use client'

import {Col} from "@/components/atoms/layout";
import React, {useEffect, useState} from "react";
import {IAd, TStep} from "@/features/my/new_ads/type";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Ad from "@/features/my/new_ads/ui/get_new/Ad";
import Bottom_bar from "@/features/my/new_ads/ui/get_new/Bottom_bar";
import  defaultAdList from "@/shared/constants/ad_list";
import {TAds_name, TAds_type} from "@/shared/type";
import {adsPublicControllerIsSponsorLinkAvailable} from "@/entities/api/advertisement-public/advertisement-public";

export default function Get_new_ads({
  setStepAction
}: {
  setStepAction: React.Dispatch<React.SetStateAction<TStep>>
}) {
  const {select, setSelect} = useSelect_context();
  const [ad_list, set_ad_list] = useState<Array<IAd>>(defaultAdList)

  const handle_ad_click = (type_name: TAds_type, name: TAds_name, price: number) => {
    setSelect(prev => {
      const has: () => boolean = () => {
        for(let i = 0; i < prev.length; i++) if(prev[i].name === name) return true;
        return false
      }
      if(has()) {
        return prev.filter(e => e.name !== name)
      } else {
        return [...prev, {type_name, name, price}]
      }
    })
  }

  useEffect(() => {
    const handleSponsorLink = async () => {
      try {
        const isPossibleToMakeSponsorLink = await adsPublicControllerIsSponsorLinkAvailable()
        if(!isPossibleToMakeSponsorLink.is_available)
          set_ad_list(p => [...p.filter(v => v.name !== '스폰서 링크')])
      } catch(e) {
        console.error(e)
        set_ad_list(p => [...p.filter(v => v.name !== '스폰서 링크')])
      }
    }
    handleSponsorLink()
  }, [])

  return (
    <Col width={'fill'} gap={16}>
      <Subject_section step={'get'}/>
      <Col width={'fill'} gap={64}>
        <Col gap={128} width={'fill'}>
          {ad_list.map((v, i) => (
            <Ad
              key={i}
              onClick={() => handle_ad_click(v.type_name, v.name, v.default_price)}
              active={select.findIndex((e) => v.name === e.name) !== -1}
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
