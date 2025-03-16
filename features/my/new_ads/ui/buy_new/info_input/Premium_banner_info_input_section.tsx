'use client'

import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import React, {useEffect, useState} from "react";
import {IPremium_banner_req, TAds_name} from "@/shared/type";
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";

export default function Premium_banner_info_input_section({
	name
}: {
	name: TAds_name
}) {
	const {set_ad_req_data} = use_banner_info_context()
	const [ad_info, set_ad_info] = useState<IPremium_banner_req>({
		title: '',
		location: null
	})
	const [selected_idx, set_selected_idx] = useState<number | null>(null)

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name !== name)
			new_state.push({
				name,
				req_data: ad_info
			})
			return [...new_state]
		})
	}, [ad_info])

	return (
		<>
		  <Col gap={4} width={'fill'}>
			  <Typo.Caption color={'dim'}>제목</Typo.Caption>
			  <BaseTextInput
				  width={'fill'}
				  size={'normal'}
				  value={ad_info.title}
				  onChangeAction={(v) => set_ad_info(prev => ({...prev, title: v}))}
				  placeholder={'제목을 입력해주세요'}
			  />
		  </Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>지역</Typo.Caption>
				<Select
					placeholder={'지역을 선택해주세요'}
					option={location_list}
					selected_idx={selected_idx}
					set_selected_idx={(idx) => {
						if(idx) {
							set_selected_idx(idx)
							set_ad_info(prev => ({...prev, location: location_list[idx]}))
						}
					}}
					max_option_item_show={5}
				/>
			</Col>
		</>
	)
}