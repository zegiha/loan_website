
import {TAds_name} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";
import {Main_banner_info_input, use_main_banner_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_main_banner({name}: {name: TAds_name}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()

	const default_value = use_main_banner_info()

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name != name)
			new_state.push({
				name,
				req_data: default_value.banner_info,
				price: 2000000
			})
			return [...new_state]
		})

		set_validate_list(prev => {
			const data = [...prev.filter(v => v.name !== name)]

			data.push({name, status: is_typed(default_value.banner_info.title) === null, error_message: `${name}의 제목이 비어있습니다`})
			data.push({name, status: is_typed(default_value.banner_info.subtitle) === null, error_message: `${name}의 소제목이 비어있습니다`})
			data.push({name, status: default_value.banner_info.loan_available_location !== null, error_message: `${name}의 대출 가능 지역이 비어있습니다`})
      data.push({name, status: is_typed(default_value.banner_info.loan_limit) === null, error_message: `${name}의 대출한도가 비어있습니다`})
			// data.push({name, status: default_value.banner_info.banner_cover_img !== null, error_message: `${name}의 이미지가 없습니다`})

			return [...data]
		})
	}, [default_value.banner_info])

	return <Main_banner_info_input {...default_value}/>
}
