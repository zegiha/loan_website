import {is_typed} from "@/shared/helper";
import React, {useEffect} from "react";
import {TAds_name} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {Top_banner_info_input, use_top_banner_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_top_banner({
	name
}: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const props = use_top_banner_info()

	useEffect(() => {
		set_ad_req_data(prev => {
			const data = [...prev]
      let sw = true;
			for(let i = 0; i < data.length; i++)
				if(data[i].name === name) {
          data[i].req_data = props.banner_info
          sw = false
        }
      if(sw) {
        data.push({
					name,
					req_data: props.banner_info,
					price: 2500000
				})
      }
			return [...data]
		})
		set_validate_list(prev => {
			const data = [...prev.filter(v => v.name !== name)]

			data.push({name, status: is_typed(props.banner_info.title) === null, error_message: '메인 TOP 배너광고의 제목이 비어있습니다'})
			data.push({name, status: is_typed(props.banner_info.contents) === null, error_message: '메인 TOP 배너광고의 내용이 비어있습니다'})
      data.push({name, status: is_typed(props.banner_info.loan_limit) === null, error_message: `${name}의 대출한도가 비어있습니다`})
			// data.push({name, status: props.banner_info.banner_cover_img !== null, error_message: '메인 TOP 배너광고의 이미지가 비어있습니다'})

			return [...data]
		})
	}, [props.banner_info])

	return <Top_banner_info_input {...props}/>
}
