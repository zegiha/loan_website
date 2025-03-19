import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput, File_input} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import React, {useEffect, useState} from "react";
import {ITop_banner_req, TAds_name} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";
import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";

export default function Top_banner_info_input_section({
	name
}: {
	name: TAds_name
}) {
	const {set_validate_list} = use_info_validate_context()
	const {set_ad_req_data} = use_banner_info_context()
	const [banner_info, set_banner_info] = useState<ITop_banner_req>({
		title: '',
		contents: '',
		banner_cover_img: null
	})

	useEffect(() => {
		set_ad_req_data(prev => {
			const data = [...prev]
			for(let i = 0; i < data.length; i++)
				if(data[i].name === name) data[i].req_data = banner_info
			return [...data]
		})
		set_validate_list(prev => {
			const data = [...prev.filter(v => v.name !== name)]

			data.push({name, status: is_typed(banner_info.title) === null, error_message: '메인 TOP 배너광고의 제목이 비어있습니다'})
			data.push({name, status: is_typed(banner_info.contents) === null, error_message: '메인 TOP 배너광고의 내용이 비어있습니다'})
			data.push({name, status: banner_info.banner_cover_img !== null, error_message: '메인 TOP 배너광고의 이미지가 비어있습니다'})

			return [...data]
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
					checkError={[is_typed]}
					onChangeAction={(v) => set_banner_info(prev => ({...prev, title: v}))}
					placeholder={'제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>내용</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.contents}
					checkError={[is_typed]}
					onChangeAction={(v) => set_banner_info(prev => ({...prev, contents: v}))}
					placeholder={'내용을 입력해주세요'}
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