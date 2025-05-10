'use client'

import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useEffect} from "react";
import {TAds_name} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {is_typed} from "@/shared/helper";
import {Premium_banner_info_input, use_premium_banner_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_premium_banner({
	name
}: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const props = use_premium_banner_info()

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name !== name)
			new_state.push({
				name,
				req_data: props.banner_info
			})
			return [...new_state]
		})

		set_validate_list(prev => {
			const data = [...prev.filter(v => v.name !== name)]

			data.push({name, status: is_typed(props.banner_info.title) === null, error_message: '프리미엄 배너광고의 제목이 없습니다'})
			data.push({name, status: is_typed(props.banner_info.location) === null, error_message: '프리미엄 배너광고의 지역이 없습니다'})

			return [...data]
		})
	}, [props.banner_info])

	return <Premium_banner_info_input {...props}/>
}