'use client'

import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useEffect} from "react";
import {TAds_name} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {is_typed} from "@/shared/helper";
import {Line_info_input, use_line_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_line({
	name
}: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const props = use_line_info()

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name !== name)
			new_state.push({
				name,
				req_data: props.banner_info,
				price: 0
			})
			return [...new_state]
		})
		set_validate_list(prev => {
			const new_data = [...prev.filter(v => v.name !== name)]
			new_data.push({name, status: is_typed(props.banner_info.title) === null, error_message: '줄광고의 제목이 비어있습니다'})
      new_data.push({name, status: is_typed(props.banner_info.loan_limit) === null, error_message: '줄광고에 대출한도가 비어있습니다'})
			return [...new_data]
		})
	}, [props.banner_info])

	return <Line_info_input {...props}/>
}
