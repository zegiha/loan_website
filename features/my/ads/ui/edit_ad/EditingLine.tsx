import useEditing from '@/features/my/ads/model/useEditing'
import {TAds_name} from "@/shared/type";
import React, {useCallback} from "react";
import Edit_main_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_main_banner";
import {Col} from "@/components/atoms/layout";
import {Info_input_section} from "@/components/organisms/ad_input_sections";
import {BaseButton, button} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import Edit_top_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_top_banner";
import Edit_product_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_product_banner";
import Edit_location_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_location_banner";
import react_state_action from "@/shared/type/react_state_action";
import Edit_premium_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_premium_banner";
import Edit_sponsor_link from "@/features/my/ads/ui/edit_ad/info_input/Edit_sponsor_link";
import {AdResponseDto, ScrollAdResponseDto} from "@/entities/const";
import Edit_line from "@/features/my/ads/ui/edit_ad/info_input/Edit_line";

export default function EditingLine({
  adData,
  set_step,
}: {
  adData: ScrollAdResponseDto,
  set_step: react_state_action<0 | 1>
}) {
  const {
    handleEditScrollAd
  } = useEditing(adData.id)
  const {validates, edit_data} = use_context_with_check(Edit_data_context);

  const handle_submit = useCallback(() => {
    for(let i = 0; i < validates.length; i++) {
      if(!validates[i].status) {
        alert(validates[i].errormessage)
        return
      }
    }

    if(edit_data)
      handleEditScrollAd(adData, edit_data)
        .then(() => {
          set_step(1)
        })
  }, [adData, edit_data, validates])

  return (
    <Col width={'fill'} gap={24}>
      <Info_input_section title={'줄광고'}>
        <Edit_line adData={adData}/>
      </Info_input_section>
      <BaseButton className={button.primary_button44} onClick={handle_submit}>
        <Typo.Contents color={'onPrimary'}>
          수정하기
        </Typo.Contents>
      </BaseButton>
    </Col>
  )
}
