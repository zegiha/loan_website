import {TAds_name, TAds_type} from "@/shared/type";
import React from "react";
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

export default function Editing({
	ad_name,
	ad_type,
	set_step,
}: {
	ad_name: TAds_name
	ad_type: TAds_type
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

	return (
		<Col width={'fill'} gap={24}>
			<Info_input_section title={ad_name}>
				<Edit_field {...{ad_type}}/>
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
	ad_type,
}: {
	ad_type: TAds_type
}) {
	switch(ad_type) {
		case 'banner': return <Edit_main_banner/>
		case 'top_banner': return <Edit_top_banner/>
		case "product_banner": return <Edit_product_banner/>
		case "location_banner": return <Edit_location_banner/>
		case "line": return <Edit_line/>
		case "premium_banner": return <Edit_premium_banner/>
		case "sponsor_link": return <Edit_sponsor_link/>
	}
}