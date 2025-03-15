'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput, File_input} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {loan_production_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect, useState} from "react";
import {IProduct_banner_req, TAds_name} from "@/shared/type";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";

export default function Product_banner_info_input_section({
	                                                           name,
                                                           }: {
	name: TAds_name
}) {
	const {set_ad_req_data} = use_banner_info_context()
	const [banner_info, set_banner_info] = useState<IProduct_banner_req>({
		title: '',
		subtitle: '',
		phone: '',
		banner_cover_img: null,
		product: null,
	})
	const [selected_idx, set_selected_idx] = useState<number | null>(null)

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name != name)
			new_state.push({
				name,
				req_data: banner_info
			})
			return [...new_state]
		})
	}, [banner_info]);

	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.title}
					onChangeAction={(v) => set_banner_info(prev => ({...prev, title: v}))}
					placeholder={'제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>소제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.subtitle}
					onChangeAction={(v) => (set_banner_info(prev => ({...prev, subtitle: v})))}
					placeholder={'소제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>상품</Typo.Caption>
				<Select
					placeholder={'상품을 선택해주세요'}
					option={loan_production_list}
					selected_idx={selected_idx}
					set_selected_idx={(idx) => {
						if(idx) {
							set_selected_idx(idx)
							set_banner_info(prev => ({...prev, product: loan_production_list[idx]}))
						}
					}}
					max_option_item_show={5}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Contents color={'dim'}>배너 이미지</Typo.Contents>
				<File_input
					className={style.banner_file_input}
					set_data={(v) => {set_banner_info(prev => ({...prev, banner_cover_img: v}))}}
					placeholder={`배너 이미지를 끌어올리거나\n이 박스를 눌러 선택해주세요`}
					placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
				/>
			</Col>
		</>
	)
}