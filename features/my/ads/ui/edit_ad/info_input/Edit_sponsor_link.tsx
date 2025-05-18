import {Sponsor_link_info_input, use_sponsor_link_info} from "@/components/organisms/ad_input_sections";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";
import {AdResponseDto} from "@/entities/const";

export default function Edit_sponsor_link({
  adData
}: {
  adData?: AdResponseDto
}) {
	const props = use_sponsor_link_info(adData)
	const {set_edit_data, set_validates} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.contents) === null, errormessage: '내용이 비어있습니다'},
		])
	}, [props.banner_info]);

	return <Sponsor_link_info_input {...props}/>
}
