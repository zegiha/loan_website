import {IProduct_banner_info_input} from "@/components/organisms/ad_input_sections";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import Select from "@/components/molecules/inputs/select/Select";
import {loan_production_list, location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React from "react";

export default function Product_banner_info_input({
	banner_info,
	set_banner_info,
	available_productions,
	set_available_productions,
	check_available_productions,
	set_check_available_productions,
	production_num,
	set_production_num,
	production_num_string,
	set_production_num_string,
	available_location,
	set_available_location
}: IProduct_banner_info_input){
	const handle_apply_production_num_string = () => {
		const processed_input: number = Number(production_num_string)
		if(processed_input >= 3 && processed_input <= 27) {
			set_production_num(processed_input)
		} else {
			if(processed_input < 3)   {
				alert('상품 카테고리 최소 갯수는 3개입니다')
				set_production_num_string('3')
				set_production_num(3)
			}
			else {
				alert('상품 카테고리 최대 개수는 27개입니다')
				set_production_num_string('27')
				set_production_num(27)
			}
		}
	}
	const handle_product_selection = (idx: number | null, i: number) => {
		if(idx === null) return
		if(available_productions[i] === idx) return

		if(check_available_productions.has(idx)) {
			alert('이미 선택된 지역입니다')
			return
		}

		const new_selected_product = new Set(check_available_productions)
		if(available_productions[i] !== null) new_selected_product.delete(available_productions[i])
		new_selected_product.add(idx)

		set_check_available_productions(new_selected_product)
		set_available_productions(prev => {
			const new_data = [...prev]
			new_data[i] = idx
			return [...new_data]
		})
	}
	return (
		<>
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
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>상품 개수</Typo.Caption>
				<Row width={'fill'} gap={8}>
					<BaseTextInput
						width={'fill'}
						size={'normal'}
						value={production_num_string}
						inputType={'number'}
						onChangeAction={v => set_production_num_string(v)}
						placeholder={'상품 카테고리 개수를 입력해주세요'}
					/>
					<BaseButton
						className={button.grayButton36}
						onClick={handle_apply_production_num_string}
					>
						<Typo.Contents width={'hug'}>적용</Typo.Contents>
					</BaseButton>
				</Row>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>대출 가능 지역</Typo.Caption>
				<Select
					placeholder={'대출 가능 지역을 선택해주세요'}
					option={location_list}
					selected_idx={available_location}
					set_selected_idx={(idx) => {
						if(idx !== null) {
							set_available_location(idx)
							set_banner_info(prev => ({...prev, loan_available_location: location_list[idx]}))
						}
					}}
					max_option_item_show={5}
				/>
			</Col>
			{Array.from({length: production_num}).map((_, i) => (
				<Col gap={4} width={'fill'} key={i}>
					<Typo.Caption color={'dim'}>상품 카테고리 {i+1}</Typo.Caption>
					<Select
						placeholder={`상품 카테고리를 선택해주세요`}
						option={loan_production_list}
						selected_idx={available_productions[i]}
						set_selected_idx={(idx) => handle_product_selection(idx, i)}
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