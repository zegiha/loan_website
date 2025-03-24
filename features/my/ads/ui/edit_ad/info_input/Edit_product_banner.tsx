import {Product_banner_info_input, use_product_banner_info} from "@/components/organisms/ad_input_sections";
import {use_context_with_check} from "@/shared/hooks";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";

export default function Edit_product_banner() {
	const props = use_product_banner_info()
	const {set_edit_data, set_validates, set_price} = use_context_with_check(Edit_data_context)

	useEffect(() => {
		const get_price = (): number => {
			if(props.production_num === 3) return 300000
			else return 300000 + (props.production_num - 3) * 100000
		}

		set_price(get_price())
		set_edit_data(props.banner_info)
		set_validates([
				{status: is_typed(props.banner_info.title) === null, errormessage: '제목이 비어있습니다'},
				{status: is_typed(props.banner_info.subtitle) === null, errormessage: '소제목이 비어있습니다'},
				{status: props.banner_info.product !== null && props.banner_info.product.length === props.production_num, errormessage: '상품이 일부 비어있습니다'},
				{status: props.banner_info.banner_cover_img !== null, errormessage: '이미지가 없습니다'},
		])
	}, [props.banner_info, props.production_num])

	return <Product_banner_info_input {...props}/>
}