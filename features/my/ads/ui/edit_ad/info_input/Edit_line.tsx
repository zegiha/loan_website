import {Line_info_input, use_line_info} from "@/components/organisms/ad_input_sections";
import {AdResponseDto} from '@/entities/const'
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";

export default function Edit_line({
	adData,
}: {
	adData?: AdResponseDto
}) {
	const props = use_line_info(adData)
	const {set_edit_data, set_validates} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 비어있습니다'},
			{status: is_typed(props.banner_info.loan_limit) === null, errormessage: '대출 한도가 비어있습니다'},
		])
	}, [props.banner_info])

	return <Line_info_input {...props}/>
}