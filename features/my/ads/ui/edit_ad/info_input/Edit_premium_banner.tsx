import {Premium_banner_info_input, use_premium_banner_info} from "@/components/organisms/ad_input_sections";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";

export default function Edit_premium_banner() {
	const props = use_premium_banner_info()
	const {set_edit_data, set_validates} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 없습니다'},
			{status: is_typed(props.banner_info.location) === null, errormessage: '지역이 없습니다'},
		])
	}, [props.banner_info]);

	return <Premium_banner_info_input {...props}/>
}