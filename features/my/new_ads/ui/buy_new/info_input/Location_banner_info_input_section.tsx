'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect, useState} from "react";
import {ILocation_banner_req, TAds_name, TLocation} from "@/shared/type";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import ad_list from "@/features/my/new_ads/const/ad_list";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {is_typed} from "@/shared/helper";

const option: Array<string> =
	ad_list[5].price_desc.map((v) => v.desc + ' - ' + v.price)
		.concat(ad_list[5].sub_price_desc?.desc + ' - ' + ad_list[5].sub_price_desc?.price)

export default function Location_banner_info_input_section({
	                                                       name,
                                                       }: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {setSelect} = useSelect_context()
	const {set_ad_req_data} = use_banner_info_context()
	const [banner_info, set_banner_info] = useState<ILocation_banner_req>({
		title: '',
		subtitle: '',
		phone: '',
		banner_cover_img: null,
		location: null
	})
	const [selected_idx, set_selected_idx] = useState<Array<number | null>>(Array.from({length: 27}).map(() => null))

	const [option_selected_idx, set_option_selected_idx] = useState<number | null>(0)
	const [selected_location, set_selected_location] = useState<Set<number>>(new Set())
	const [input_location_num, set_input_location_num] = useState<string>('4')
	const [location_num, set_location_num] = useState<number>(1)

	const handle_input_location_num = () => {
		const pd = Number(input_location_num)
		if(pd >= 4 && pd <= 26) {
			set_location_num(pd)
		} else {
			if(pd < 4) {
				alert('최솟값은 4입니다')
				set_input_location_num('4')
				set_location_num(4)
			} else {
				alert('최댓값은 26입니다')
				set_input_location_num('26')
				set_location_num(26)
			}
		}
	}

	const handle_location_selection = (selected_option_idx: number | null, i: number) => {
		if(selected_option_idx === null) return
		if(selected_idx[i] === selected_option_idx) return

		if(selected_location.has(selected_option_idx)) {
			alert('이미 선택된 지역입니다')
			return
		}

		const newSelectedLocation = new Set(selected_location)
		if(selected_idx[i] !== null) newSelectedLocation.delete(selected_idx[i])
		newSelectedLocation.add(selected_option_idx)

		set_selected_location(newSelectedLocation)
		set_selected_idx(prev => {
			const newSelectedIdx = [...prev]
			newSelectedIdx[i] = selected_option_idx
			return newSelectedIdx
		})
	}

	useEffect(() => {
		if(option_selected_idx !== 3 && option_selected_idx !== null) set_location_num(option_selected_idx+1)
		else {
			set_input_location_num('4')
			set_location_num(4)
		}
	}, [option_selected_idx]);

	useEffect(() => {
		const get_price = (): number => {
			switch (location_num) {
				case 1: return 200000
				case 2: return 400000
				case 3: return 500000
				default: return 500000 + (location_num-3)*100000
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

	useEffect(() => {
		set_banner_info(prev => {
			const new_data = {...prev}
			const new_location: Array<TLocation> = []
			selected_idx.forEach(v => {
				if(v !== null) new_location.push(location_list[v])
			})
			new_data.location = new_location
			return {...new_data}
		})
	}, [selected_idx]);

	useEffect(() => {
		if(banner_info && location_num && set_validate_list) {
			set_validate_list(prev => {
				const data = [...prev.filter(v => v.name !== name)]

				data.push({name, status: is_typed(banner_info.title) === null, error_message: '지역 배너광고의 제목이 비어있습니다'})
				data.push({name, status: is_typed(banner_info.subtitle) === null, error_message: '지역 배너광고의 소제목이 비어있습니다'})
				data.push({name, status: banner_info.location !== null && banner_info.location.length === location_num, error_message: '지역 배너광고의 지역이 일부 비어있습니다'})
				data.push({name, status: banner_info.banner_cover_img !== null, error_message: '지역 배너광고의 이미지가 없습니다'})

				return [...data]
			})
		}
	}, [banner_info, location_num]);

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
						<Row width={'fill'} gap={8}>
							<BaseTextInput
								width={'fill'}
								size={'normal'}
								value={input_location_num}
								inputType={'number'}
								onChangeAction={v => set_input_location_num(v)}
							/>
							<BaseButton
								className={button.grayButton36}
								onClick={handle_input_location_num}
							>
								<Typo.Contents width={'hug'}>적용</Typo.Contents>
							</BaseButton>
						</Row>
					)}
				</Col>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.title}
					checkError={[is_typed]}
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
					checkError={[is_typed]}
					onChangeAction={(v) => (set_banner_info(prev => ({...prev, subtitle: v})))}
					placeholder={'소제목을 입력해주세요'}
				/>
			</Col>
			{Array.from({length: location_num}).map((_, i) => (
				<Col gap={4} width={'fill'} key={i}>
					<Typo.Caption color={'dim'}>지역{location_num !== 1 ? i+1 : ''}</Typo.Caption>
					<Select
						placeholder={`지역${location_num !== 1 ? i+1 : ''}을 선택해주세요`}
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