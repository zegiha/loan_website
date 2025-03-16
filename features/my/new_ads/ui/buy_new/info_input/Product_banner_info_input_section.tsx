'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button, File_input} from "@/components/molecules/inputs";
import Select from "@/components/molecules/inputs/select/Select";
import {loan_production_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React, {useEffect, useState} from "react";
import {IProduct_banner_req, TAds_name} from "@/shared/type";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import TLoan_production_type from "@/shared/type/TLoan_production_type";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";

export default function Product_banner_info_input_section({
	                                                           name,
                                                           }: {
	name: TAds_name
}) {
	const {setSelect} = useSelect_context()
	const {set_ad_req_data} = use_banner_info_context()
	const [banner_info, set_banner_info] = useState<IProduct_banner_req>({
		title: '',
		subtitle: '',
		phone: '',
		banner_cover_img: null,
		product: null,
	})
	const [selected_idx, set_selected_idx] = useState<Array<number | null>>(Array.from({length: 27}).map(() => null))

	const [input_production_num, set_input_production_num] = useState<string>('3')
	const [production_num, set_production_num] = useState<number>(3)
	const [selected_product, set_selected_product] = useState<Set<number>>(new Set())

	const handle_apply_input_production_num = () => {
		const processed_input: number = Number(input_production_num)
		if(processed_input >= 3 && processed_input <= 27) {
			set_production_num(processed_input)
		} else {
			if(processed_input < 3)   {
				alert('상품 카테고리 최소 갯수는 3개입니다')
				set_input_production_num('3')
			}
			else {
				alert('상품 카테고리 최대 개수는 27개입니다')
				set_input_production_num('27')
			}
		}
	}

	const handle_product_selection = (idx: number | null, i: number) => {
		if(idx === null) return
		if(selected_idx[i] === idx) return

		if(selected_product.has(idx)) {
			alert('이미 선택된 지역입니다')
			return
		}

		const new_selected_product = new Set(selected_product)
		if(selected_idx[i] !== null) new_selected_product.delete(selected_idx[i])
		new_selected_product.add(idx)

		set_selected_product(new_selected_product)
		set_selected_idx(prev => {
			const new_data = [...prev]
			new_data[i] = idx
			return [...new_data]
		})
	}

	useEffect(() => {
		const get_price = (): number => {
			if(production_num === 3) return 300000
			else return 300000 + (production_num-3) * 100000
		}
		setSelect(prev => {
			const new_data = [...prev.filter(v => v.name !== name)]
			new_data.push({
				type_name: 'product_banner',
				name,
				price: get_price()
			})
			return [...new_data]
		})
	}, [production_num]);

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
			const new_product: Array<TLoan_production_type> = []
			selected_idx.forEach(v => {
				if(v !== null) new_product.push(loan_production_list[v])
			})
			new_data.product = new_product
			return {...new_data}
		})
	}, [selected_idx])

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
				<Typo.Caption color={'dim'}>상품 개수</Typo.Caption>
				<Row width={'fill'} gap={8}>
					<BaseTextInput
						width={'fill'}
						size={'normal'}
						value={input_production_num}
						inputType={'number'}
						onChangeAction={v => set_input_production_num(v)}
						placeholder={'상품 카테고리 개수를 입력해주세요'}
					/>
					<BaseButton
						className={button.grayButton36}
						onClick={handle_apply_input_production_num}
					>
						<Typo.Contents width={'hug'}>적용</Typo.Contents>
					</BaseButton>
				</Row>
			</Col>
			{Array.from({length: production_num}).map((_, i) => (
				<Col gap={4} width={'fill'} key={i}>
					<Typo.Caption color={'dim'}>상품 카테고리 {i+1}</Typo.Caption>
					<Select
						placeholder={`상품 카테고리를 선택해주세요`}
						option={loan_production_list}
						selected_idx={selected_idx[i]}
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