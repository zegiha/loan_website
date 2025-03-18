'use client'

import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import React, {useEffect, useState} from "react";
import {ILine_req, TAds_name} from "@/shared/type";
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";

export default function Line_info_input_section({
	name
}: {
	name: TAds_name
}) {
	// const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const [ad_info, set_ad_info] = useState<ILine_req>({
		title: '',
		loan_limit: '',
		location: null
	})
	const [selected_idx, set_selected_idx] = useState<number | null>(null)

	const to_won = (v: string): string => {
		const to_number = () => {
			let res = 0;
			for(let i = 0; i < v.length; i++) {
				if(v[i] !== ',') {
					res *= 10;
					res += Number(v[i])
				}
			}
			return res
		}
		const num = to_number()
		if (isNaN(num) || num === 0) return '';
		return num.toLocaleString('ko-KR');
	}

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
	//
	// useEffect(() => {
	// 	set_validate_list(prev => {
	// 		const new_data = [...prev]
	// 		new_data.push({name, status: is_typed(ad_info.title) === null})
	// 		new_data.push({name, status: is_typed(ad_info.location) === null})
	// 		new_data.push({name, status: is_typed(ad_info.loan_limit) === null})
	// 		return [...new_data]
	// 	})
	// }, []);

	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={ad_info.title}
					// checkError={[is_typed]}
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
						if(idx !== null) {
							set_selected_idx(idx)
							set_ad_info(prev => ({...prev, location: location_list[idx]}))
						}
					}}
					max_option_item_show={5}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>대출한도</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={ad_info.loan_limit}
					onChangeAction={(v) => set_ad_info(prev => ({...prev, loan_limit: to_won(v)}))}
					placeholder={'대출한도를 입력해주세요'}
					TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
				/>
			</Col>
		</>
	)
}