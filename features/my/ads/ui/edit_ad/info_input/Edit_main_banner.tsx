import {Main_banner_info_input, use_main_banner_info} from "@/components/organisms/ad_input_sections";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";
import {AdResponseDto} from "@/entities/const";

export default function Edit_main_banner({
  adData
}: {
  adData?: AdResponseDto
}) {
	const props = use_main_banner_info(adData)

	const {set_edit_data, set_validates} = use_context_with_check(Edit_data_context)
	useEffect(() => {
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 비어있습니다'},
			{status: is_typed(props.banner_info.subtitle) === null, errormessage: '소제목이 비어있습니다'},
			{status: props.banner_info.loan_available_location !== null, errormessage: '대출 가능 지역이 선택되어있지 않습니다'},
			// {status: props.banner_info.banner_cover_img !== null, errormessage: '배너 이미지가 없습니다'},
		])
	}, [props.banner_info])

	return <Main_banner_info_input
    {...props}
  />
}
