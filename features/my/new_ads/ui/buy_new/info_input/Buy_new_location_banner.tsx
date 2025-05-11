'use client'

import {TAds_name} from "@/shared/type";
import {useEffect} from "react";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {is_typed} from "@/shared/helper";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {Location_banner_info_input, use_location_banner_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_location_banner({name}: {name: TAds_name}) {
	const {setSelect} = useSelect_context()
	const {set_ad_req_data} = use_banner_info_context()
	const {set_validate_list} = use_info_validate_context()

	const default_value = use_location_banner_info()

	useEffect(() => {
		if(default_value.banner_info && default_value.location_num && set_validate_list) {
			set_validate_list(prev => {
				const data = [...prev.filter(v => v.name !== name)]

				data.push({name, status: is_typed(default_value.banner_info.title) === null, error_message: '지역 배너광고의 제목이 비어있습니다'})
				data.push({name, status: is_typed(default_value.banner_info.subtitle) === null, error_message: '지역 배너광고의 소제목이 비어있습니다'})
				data.push({name, status: default_value.banner_info.location !== undefined &&default_value. banner_info.location.length === default_value.location_num, error_message: '지역 배너광고의 지역이 일부 비어있습니다'})
				// data.push({name, status: default_value.banner_info.banner_cover_img !== null, error_message: '지역 배너광고의 이미지가 없습니다'})

				return [...data]
			})
			console.log(default_value.banner_info)
		}
	}, [default_value.banner_info, default_value.location_num]);

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name != name)
			new_state.push({
				name,
				req_data: default_value.banner_info
			})
			return [...new_state]
		})
	}, [default_value.banner_info])

	useEffect(() => {
		const get_price = (): number => {
			switch (default_value.location_num) {
				case 1: return 200000
				case 2: return 400000
				case 3: return 500000
				default: return 500000 + (default_value.location_num-3)*100000
			}
		}
		setSelect(prev => {
			const new_data = [...prev]
			for(let i = 0; i < new_data.length; i++)
				if(new_data[i].name === name) new_data[i].price = get_price()
			return [...new_data]
		})
	}, [default_value.location_num])

	return <Location_banner_info_input {...default_value}/>
}