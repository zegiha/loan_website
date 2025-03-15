'use client'

import React, {useEffect, useState} from "react";
import {TStep} from "@/features/my/new_ads/type";
import {Col} from "@/components/atoms/layout";
import {Banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import Subject_section from "@/features/my/new_ads/ui/Subject_section";
import Selected_ads from "@/features/my/new_ads/ui/Selected_ads";
import Buy_table_section from "@/features/my/new_ads/ui/Buy_table_section";
import {BaseButton, button} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";
import {TAds_name, TAll_req, TAds_type} from "@/shared/type";
import Info_input_section from "@/features/my/new_ads/ui/info_input/Info_input_section";
import Main_banner_info_input_section from "@/features/my/new_ads/ui/info_input/Main_banner_info_input_section";
import Premium_banner_info_input_section from "@/features/my/new_ads/ui/info_input/Premium_banner_info_input_section";
import Line_info_input_section from "@/features/my/new_ads/ui/info_input/Line_info_input_section";
import Sponsor_link_info_input_section from "@/features/my/new_ads/ui/info_input/Sponsor_link_info_input_section";
import Product_banner_info_input_section from "@/features/my/new_ads/ui/info_input/Product_banner_info_input_section";
import Location_banner_info_input_section from "@/features/my/new_ads/ui/info_input/Location_banner_info_input_section";

export default function Buy_new_ads({
  setStepAction
}: {
  setStepAction: React.Dispatch<React.SetStateAction<TStep>>
}) {

  const [depositor, setDepositor] = useState<string>('')

  const [ad_req_data, set_ad_req_data] = useState<Array<{
    name: TAds_name
    req_data: TAll_req
  }>>([])

  const default_value = {ad_req_data, set_ad_req_data}

  const handleSubmit = () => {
    // if(title === '') {
    //   alert('배너 제목을 입력해주세요')
    // } else if(contents === '') {
    //   alert('배너 내용을 입력해주세요')
    // } else if(depositor === '') {
    //   alert('예금자명을 입력해주세요')
    // } else {
    //   window.scrollTo({top: 0})
    //   setStepAction('end');
    // }
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
    case "banner": return <Main_banner_info_input_section name={name}/>
    case "product_banner": return <Product_banner_info_input_section name={name}/>
    case "location_banner": return <Location_banner_info_input_section name={name}/>
    case "line": return <Line_info_input_section name={name}/>
    case "premium_banner": return <Premium_banner_info_input_section name={name}/>
    case "sponsor_link": return <Sponsor_link_info_input_section name={name}/>
    default: return <Typo.Contents color={'dim'}>선택사항이 없습니다</Typo.Contents>
  }
}
