import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {TAds_name} from "@/shared/type";
import {useEffect} from "react";
import {is_typed} from "@/shared/helper";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {Sponsor_link_info_input, use_sponsor_link_info} from "@/components/organisms/ad_input_sections";

export default function Buy_new_sponsor_link({
	name
}: {
	name: TAds_name,
}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const props = use_sponsor_link_info()

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

			data.push({name, status: is_typed(props.banner_info.contents) === null, error_message: '스폰서 링크의 내용이 없습니다'})

			return [...data]
		})
	}, [props.banner_info])

	return <Sponsor_link_info_input {...props}/>
}