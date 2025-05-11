import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput, File_input} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React from "react";
import {IMain_banner_info_input} from "@/components/organisms/ad_input_sections";

export default function Main_banner_info_input({
	banner_info,
	selected_available_location_idx,
	set_banner_info,
	set_selected_available_location_idx
}: IMain_banner_info_input) {
	return (
		<>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>제목</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.title}
					checkError={[is_typed]}
					onChangeAction={(title) => set_banner_info(prev => ({...prev, title}))}
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
					onChangeAction={(subtitle) => set_banner_info(prev => ({...prev, subtitle}))}
					placeholder={'소제목을 입력해주세요'}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Caption color={'dim'}>대출 가능 지역</Typo.Caption>
				<Select
					placeholder={'대출 가능 지역을 선택해주세요'}
					option={location_list}
					selected_idx={selected_available_location_idx}
					set_selected_idx={(idx) => {
						if(idx !== null) {
							set_selected_available_location_idx(idx)
							set_banner_info(prev => ({...prev, loan_available_location:location_list[idx]}))
						}
					}}
					max_option_item_show={5}
				/>
			</Col>
			<Col gap={4} width={'fill'}>
				<Typo.Contents color={'dim'}>배너 이미지, 필수가 아닙니다</Typo.Contents>
				<File_input
					className={style.banner_file_input}
					set_data={(banner_cover_img) => set_banner_info(prev => ({...prev, banner_cover_img}))}
					placeholder={`배너 이미지를 끌어올리거나\n이 박스를 눌러 선택해주세요`}
					placeholder_icon={<Upload_icon color={'dim'} size={64}/>}
				/>
			</Col>
		</>
	)
}