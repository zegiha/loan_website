'use client'

import {useEffect} from "react";
import {TAds_name} from "@/shared/type";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {is_typed} from "@/shared/helper";
import {Product_banner_info_input, use_product_banner_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_product_banner({
	name,
}: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {setSelect} = useSelect_context()
	const {set_ad_req_data} = use_banner_info_context()
	const props = use_product_banner_info()

	useEffect(() => {
		const get_price = (): number => {
			if(props.production_num === 3) return 300000
			else return 300000 + (props.production_num-3) * 100000
		}
		setSelect(prev => {
			const new_data = [...prev]
			for(let i = 0; i < new_data.length; i++)
				if(new_data[i].name === name) new_data[i].price = get_price()
			return [...new_data]
		})
	}, [props.production_num]);

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name != name)
			new_state.push({
				name,
				req_data: props.banner_info
			})
			return [...new_state]
		})
	}, [props.banner_info]);

	useEffect(() => {
		if(props.banner_info && props.production_num && set_validate_list) {
			set_validate_list(prev => {
				const data = [...prev.filter(v => v.name !== name)]

				data.push({name, status: is_typed(props.banner_info.title) === null, error_message: '상품 배너광고의 제목이 비어있습니다'})
				data.push({name, status: is_typed(props.banner_info.subtitle) === null, error_message: '상품 배너광고의 소제목이 비어있습니다'})
				data.push({name, status: props.banner_info.product !== undefined && props.banner_info.product.length === props.production_num, error_message: '상품 배너광고의 상품이 일부 비어있습니다'})
				// data.push({name, status: props.banner_info.banner_cover_img !== null, error_message: '상품 배너광고의 이미지가 없습니다'})

				return [...data]
			})
		}
	}, [props.banner_info, props.production_num]);

	return <Product_banner_info_input {...props}/>
}