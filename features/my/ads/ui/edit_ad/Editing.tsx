import {TAds_name, TAds_type} from "@/shared/type";
import React, {useEffect} from "react";
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
import Edit_line from "@/features/my/ads/ui/edit_ad/info_input/Edit_line";
import react_state_action from "@/shared/type/react_state_action";
import Edit_premium_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_premium_banner";
import Edit_sponsor_link from "@/features/my/ads/ui/edit_ad/info_input/Edit_sponsor_link";
import {useAdsPublicControllerFindOne} from "@/entities/api/advertisement-public/advertisement-public";
import {AdResponseDto} from "@/entities/const";

export default function Editing({
  adData,
	ad_name,
	set_step,
}: {
  adData: AdResponseDto,
	ad_name: TAds_name
	set_step: react_state_action<0 | 1>
}) {
	const {validates} = use_context_with_check(Edit_data_context);
	const handle_submit = () => {
		for(let i = 0; i < validates.length; i++) {
			if(!validates[i].status) {
				alert(validates[i].errormessage)
				return
			}
		}
		set_step(1)
	}

	useEffect(() => {
		console.log(adData)
	}, []);

	return (
		<Col width={'fill'} gap={24}>
			<Info_input_section title={ad_name}>
				<Edit_field {...{ad_name, adData}}/>
			</Info_input_section>
			<BaseButton className={button.primary_button44} onClick={handle_submit}>
				<Typo.Contents color={'onPrimary'}>
					수정하기
				</Typo.Contents>
			</BaseButton>
		</Col>
	)
}

function Edit_field({
	ad_name,
  adData,
}: {
	ad_name: TAds_name
  adData: AdResponseDto
}) {
	switch(ad_name) {
		case '메인 배너광고': return <Edit_main_banner adData={adData}/>
		case '메인 TOP 배너광고': return <Edit_top_banner adData={adData}/>
		case '상품 배너 광고': return <Edit_product_banner adData={adData}/>
		case '지역 배너광고': return <Edit_location_banner adData={adData}/>
		// case '줄광고': return <Edit_line/>
		case '프리미엄 배너광고': return <Edit_premium_banner adData={adData}/>
		case '스폰서 링크': return <Edit_sponsor_link adData={adData}/>
    default: return <></>
	}
}
