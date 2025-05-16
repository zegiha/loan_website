'use client'

import useBuyNewAds from '@/features/my/new_ads/model/useBuyNewAds'
import React, {useEffect, useState} from "react";
import {TStep} from "@/features/my/new_ads/type";
import {Col} from "@/components/atoms/layout";
import {Banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Selected_ads from "@/features/my/new_ads/ui/buy_new/Selected_ads";
import Buy_table_section from "@/features/my/new_ads/ui/buy_new/Buy_table_section";
import {BaseButton, button} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";
import {TAds_name, TAll_req, TAds_type} from "@/shared/type";
import Buy_new_premium_banner from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_premium_banner";
import Buy_new_line from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_line";
import Buy_new_sponsor_link from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_sponsor_link";
import Buy_new_product_banner from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_product_banner";
import {Info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {is_typed} from "@/shared/helper";
import Buy_new_top_banner from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_top_banner";
import Buy_new_main_banner from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_main_banner";
import Buy_new_location_banner from "@/features/my/new_ads/ui/buy_new/info_input/Buy_new_location_banner";
import {Info_input_section} from "@/components/organisms/ad_input_sections";

export default function Buy_new_ads({
  setStepAction
}: {
  setStepAction: React.Dispatch<React.SetStateAction<TStep>>
}) {
  const {select, setSelect} = useSelect_context()

  const [total_price, set_total_price] = useState(0)
  const [validate_list, set_validate_list] = useState<Array<{name: TAds_name, status: boolean, error_message: string}>>([]);

  const [depositor, setDepositor] = useState<string>('')

  const [ad_req_data, set_ad_req_data] = useState<Array<{
    name: TAds_name
    req_data: TAll_req
    price: number
  }>>([])
  const default_value = {
    ad_req_data,
    set_ad_req_data,
  }

  const {
    status,
    addAds
  } = useBuyNewAds(
    {
      depositor,
      totalPrice: total_price,
    },
    ad_req_data,
    new Set(select.map(v => ({name: v.name, price: v.price})))
  )

  const handleSubmit = () => {
    let sw = true

    for(let i = 0; i < validate_list.length; i++) {
      if(!validate_list[i].status) {
        alert(validate_list[i].error_message)
        sw = false
        break
      }
    }
    if(sw && is_typed(depositor) !== null) {
      sw = false
      alert('예금자명을 입력해주세요')
    }

    if(sw) {
      addAds()
    }
  }

  useEffect(() => {
    if(status === 'success') {
      window.scrollTo({top: 0})
      setStepAction('end')
    }
  }, [status])

  useEffect(() => {
    if(select.length === 0) {
      setStepAction('get')
    }
    let new_total_price = 0
    select.forEach(v => new_total_price += v.price)
    set_total_price(new_total_price)
  }, [select])
  useEffect(() => {
    const has_line_ad = select.findIndex(v => v.name === '줄광고') !== -1
    if(has_line_ad && total_price < 500000) setSelect(prev => [...prev.filter(v => v.name !== '줄광고')])
    else if(!has_line_ad && total_price >= 500000) setSelect(prev => [...prev, {name: '줄광고', price: 0, type_name: 'line'}])
  }, [total_price])

  return (
    <Info_validate_context.Provider value={{validate_list, set_validate_list}}>
      <Col gap={16} width={'fill'}>
        <Subject_section step={'buy'} setStepAction={setStepAction}/>
        <Col gap={32} width={'fill'}>
          <Banner_info_context.Provider value={default_value}>
            <Col width={'fill'} gap={72}>
              {select.map((v, i) => (
                <Info_input_section title={v.name} key={i}>
                  <Switcher {...v}/>
                </Info_input_section>
              ))}
            </Col>
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
    </Info_validate_context.Provider>
  );
}

function Switcher({
  type_name,
  name,
}: {
  type_name: TAds_type,
  name: TAds_name
}) {
  switch (type_name) {
    case 'banner': return <Buy_new_main_banner name={name}/>
    case 'top_banner': return <Buy_new_top_banner name={name}/>
    case "product_banner": return <Buy_new_product_banner name={name}/>
    case "location_banner": return <Buy_new_location_banner name={name}/>
    case "line": return <Buy_new_line name={name}/>
    case "premium_banner": return <Buy_new_premium_banner name={name}/>
    case "sponsor_link": return <Buy_new_sponsor_link name={name}/>
    default: return <Typo.Contents color={'dim'}>선택사항이 없습니다</Typo.Contents>
  }
}
