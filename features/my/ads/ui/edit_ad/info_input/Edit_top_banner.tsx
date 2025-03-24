import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {use_context_with_check} from "@/shared/hooks";
import {Top_banner_info_input, use_top_banner_info} from "@/components/organisms/ad_input_sections";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";

export default function Edit_top_banner() {
	const props = use_top_banner_info()

	const {set_edit_data, set_validates} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 비어있습니다'},
			{status: is_typed(props.banner_info.contents) === null, errormessage: '내용이 비어있습니다'},
			{status: props.banner_info.banner_cover_img !== null, errormessage: '배너 이미지가 없습니다'}
		])
	}, [props.banner_info])

	return <Top_banner_info_input {...props}/>
}