import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Select from "@/components/molecules/inputs/select/Select";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import {location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect} from "react";
import ad_list from "@/shared/constants/ad_list";
import {ILocation_banner_info_input} from "@/components/organisms/ad_input_sections";

const option: Array<string> =
	ad_list[5].price_desc.map((v) => v.desc + ' - ' + v.price)
		.concat(ad_list[5].sub_price_desc?.desc + ' - ' + ad_list[5].sub_price_desc?.price)

export default function Location_banner_info_input({
	banner_info,
	set_banner_info,
	available_locations,
	set_available_locations,
	check_available_locations,
	set_check_available_locations,
	location_num,
	set_location_num,
	location_num_string,
	set_location_num_string,
	selected_option_idx,
	set_selected_option_idx,
}: ILocation_banner_info_input) {
	const handle_submit_location_num_string = () => {
		const pd = Number(location_num_string)
		if(pd >= 4 && pd <= 26) {
			set_location_num(pd)
		} else {
			if(pd < 4) {
				alert('최솟값은 4입니다')
				set_location_num_string('4')
				set_location_num(4)
			} else {
				alert('최댓값은 26입니다')
				set_location_num_string('26')
				set_location_num(26)
			}
		}
	}

	const handle_location_selection = (selected_option_idx: number | null, i: number) => {
		if(selected_option_idx === null) return
		if(available_locations[i] === selected_option_idx) return

		if(check_available_locations.has(selected_option_idx)) {
			alert('이미 선택된 지역입니다')
			return
		}

		const newSelectedLocation = new Set(check_available_locations)
		if(available_locations[i] !== null) newSelectedLocation.delete(available_locations[i])
		newSelectedLocation.add(selected_option_idx)

		set_check_available_locations(newSelectedLocation)
		set_available_locations(prev => {
			const newSelectedIdx = [...prev]
			newSelectedIdx[i] = selected_option_idx
			return newSelectedIdx
		})
	}

	useEffect(() => {
		set_banner_info(prev => {
			const data = {...prev}
			data.location = []
			available_locations.forEach(v => {
				if(v !== null && data.location !== undefined) data.location.push(location_list[v])
			})
			return {...data}
		})
	}, [available_locations])
	useEffect(() => {
		if(selected_option_idx === null) return
		if(selected_option_idx >= 3) return
		set_location_num(selected_option_idx + 1)
		set_location_num_string(`${selected_option_idx + 1}`)
	}, [selected_option_idx]);

	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>옵션</Typo.Caption>
				<Col gap={8} width={'fill'}>
					<Select
						placeholder={''}
						option={option}
						selected_idx={selected_option_idx}
						set_selected_idx={(v) => set_selected_option_idx(v)}
					/>
					{selected_option_idx === 3 && (
						<Row width={'fill'} gap={8}>
							<BaseTextInput
								width={'fill'}
								size={'normal'}
								value={location_num_string}
								inputType={'number'}
								onChangeAction={(v) => set_location_num_string(v)}
							/>
							<BaseButton
								className={button.grayButton36}
								onClick={handle_submit_location_num_string}
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
					onChangeAction={(v) => set_banner_info(prev => ({...prev, subtitle: v}))}
					placeholder={'소제목을 입력해주세요'}
				/>
			</Col>
			{Array.from({length: location_num}).map((_, i) => (
				<Col gap={4} width={'fill'} key={i}>
					<Typo.Caption color={'dim'}>지역{location_num !== 1 ? i+1 : ''}</Typo.Caption>
					<Select
						placeholder={`지역${location_num !== 1 ? i+1 : ''}을 선택해주세요`}
						option={location_list}
						selected_idx={available_locations[i]}
						set_selected_idx={(idx) => handle_location_selection(idx, i)}
						max_option_item_show={5}
					/>
				</Col>
			))}
			<Col gap={4} width={'fill'}>
				<Typo.Contents color={'dim'}>배너 이미지, 필수가 아닙니다</Typo.Contents>
				<File_input
					className={style.banner_file_input}
					set_data={(v) => set_banner_info(prev => ({...prev, banner_cover_img: v}))}
					placeholder={`배너 이미지를 끌어올리거나\n이 박스를 눌러 선택해주세요`}
					placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
				/>
			</Col>
		</>
	)
}