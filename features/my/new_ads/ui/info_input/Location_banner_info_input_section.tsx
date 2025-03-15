'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput, File_input} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect, useState} from "react";
import {ILocation_banner_req, TAds_name} from "@/shared/type";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import ad_list from "@/features/my/new_ads/const/ad_list";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";

export default function Location_banner_info_input_section({
	                                                       name,
                                                       }: {
	name: TAds_name
}) {
	const {setSelect} = useSelect_context();
	const {set_ad_req_data} = use_banner_info_context()
	const [banner_info, set_banner_info] = useState<ILocation_banner_req>({
		title: '',
		subtitle: '',
		phone: '',
		banner_cover_img: null,
		location: null
	})
	const [selected_idx, set_selected_idx] = useState<Array<number | null>>(Array.from({length: 27}).map(() => null))

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

	const [option_selected_idx, set_option_selected_idx] = useState<number | null>(0)
	const [selected_location, set_selected_location] = useState<Set<number>>(new Set())
	const [location_num, set_location_num] = useState<string>('1')
	const option: Array<string> =
		ad_list[5].price_desc.map((v) => v.desc + ' - ' + v.price)
			.concat(ad_list[5].sub_price_desc?.desc + ' - ' + ad_list[5].sub_price_desc?.price)

	useEffect(() => {
		if(option_selected_idx !== 3 && option_selected_idx !== null) set_location_num(`${option_selected_idx+1}`)
		else set_location_num('4')
	}, [option_selected_idx]);

	const handle_location_selection = (idx: number | null, i: number) => {
		if(idx !== null) {
			if(selected_location.has(idx) && selected_idx[i] !== idx) {
				alert('이미 선택된 지역입니다')
			} else {
				set_selected_location(prev => {
					const new_data = new Set(prev)
					// 이전에 선택된 지역이 있었다면 제거
					if(selected_idx[i] !== null) {
						new_data.delete(selected_idx[i]);
					}
					// 새로 선택된 지역이 있으면 추가
					if(idx !== null) {
						new_data.add(idx)
					}
					return new_data
				})
				set_banner_info(prev => ({...prev, location: idx !== null ? location_list[idx] : null}))
				set_selected_idx(prev => {
					const t = [...prev]
					t[i] = idx
					return [...t]
				})
			}
		} else {
			// idx가 null인 경우 (선택 해제된 경우)
			set_selected_location(prev => {
				const new_data = new Set(prev)
				if(selected_idx[i] !== null) {
					new_data.delete(selected_idx[i]);
				}
				return new_data
			})
			set_banner_info(prev => ({...prev, location: null}))
			set_selected_idx(prev => {
				const t = [...prev]
				t[i] = null
				return [...t]
			})
		}
	}

	useEffect(() => {
		const ln = Number(location_num);
		const get_price = (): number => {
			switch (ln) {
				case 1: return 200000
				case 2: return 400000
				case 3: return 500000
				default: return 500000 + (ln-3)*100000
			}
		}
		setSelect(prev => {
			const new_data = prev.filter(v => v.name !== name)
			new_data.push({
				type_name: 'location_banner',
				name,
				price: get_price()
			})
			return [...new_data]
		})
	}, [location_num]);

	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>옵션</Typo.Caption>
				<Col gap={8} width={'fill'}>
					<Select
						placeholder={''}
						option={option}
						selected_idx={option_selected_idx}
						set_selected_idx={set_option_selected_idx}
					/>
					{option_selected_idx === 3 && (
						<BaseTextInput
							width={'fill'}
							size={'normal'}
							value={location_num.toString()}
							inputType={'number'}
							onChangeAction={raw_v => {
								const v = Number(raw_v)
								if (raw_v === '') {
									set_location_num('')
									return
								}
								if (isNaN(v)) return
								if (v < 4) {
									alert('최소값은 4입니다')
									set_location_num('4')
								} else if (v > 27) {
									alert('최댓값은 26입니다')
									set_location_num('26')
								} else {
									set_location_num(v.toString())
								}
							}}
						/>
					)}
				</Col>
			</Col>
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
			{Array.from({length: Number(location_num)}).map((_, i) => (
				<Col gap={4} width={'fill'} key={i}>
					<Typo.Caption color={'dim'}>지역{Number(location_num) !== 1 ? i+1 : ''}</Typo.Caption>
					<Select
						placeholder={`지역${Number(location_num) !== 1 ? i+1 : ''}을 선택해주세요`}
						option={location_list}
						selected_idx={selected_idx[i]}
						set_selected_idx={(idx) => handle_location_selection(idx, i)}

						max_option_item_show={5}
					/>
				</Col>
			))}
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