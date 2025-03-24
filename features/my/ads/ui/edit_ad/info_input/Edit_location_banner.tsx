import {Location_banner_info_input, use_location_banner_info} from "@/components/organisms/ad_input_sections";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";

export default function Edit_location_banner() {
	const props = use_location_banner_info()
	const {set_edit_data, set_price, set_validates} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		const get_price = (): number => {
			switch (props.location_num) {
				case 1: return 200000
				case 2: return 400000
				case 3: return 500000
				default: return 500000 + (props.location_num-3)*100000
			}
		}
		set_price(get_price())
		set_edit_data(props.banner_info)
		set_validates([
			{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 비어있습니다'},
			{status: is_typed(props.banner_info.subtitle) === null, errormessage: '소제목이 비어있습니다'},
			{status: props.banner_info.location !== null && props.banner_info.location.length === props.location_num, errormessage: '지역이 일부 비어있습니다'},
			{status: props.banner_info.banner_cover_img !== null, errormessage: '배너 이미지가 없습니다'}
		])
	}, [props.banner_info, props.location_num]);

	return <Location_banner_info_input {...props}/>
}