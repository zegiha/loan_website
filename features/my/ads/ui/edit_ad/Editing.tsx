import {TAds_name, TAds_type} from "@/shared/type";
import React from "react";
import Edit_main_banner from "@/features/my/ads/ui/edit_ad/info_input/Edit_main_banner";
import {Col} from "@/components/atoms/layout";
import {Info_input_section} from "@/components/organisms/ad_input_sections";
import {BaseButton, button} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";

export default function Editing({
	ad_name,
	ad_type,
}: {
	ad_name: TAds_name
	ad_type: TAds_type
}) {
	const {validates} = use_context_with_check(Edit_data_context);
	const handle_submit = () => {
		for(let i = 0; i < validates.length; i++) {
			if(!validates[i].status) {
				alert(validates[i].errormessage)
				return
			}
		}
		// TODO 완료 페이지로 넘어가기
	}

	return (
		<Col width={'fill'} gap={24}>
			<Info_input_section title={ad_name}>
				<Edit_field ad_type={ad_type}/>
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
	ad_type
}: {
	ad_type: TAds_type
}) {
	switch(ad_type) {
		case 'banner': return <Edit_main_banner/>
		// TODO 모든 배너 수정 대응하기
		case 'top_banner': return <></>
		case "product_banner": return <></>
		case "location_banner": return <></>
		case "line": return <></>
		case "premium_banner": return <></>
		case "sponsor_link": return <></>
		default: return <></>
	}
}