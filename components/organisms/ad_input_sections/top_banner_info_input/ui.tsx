import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput, File_input} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import style from "@/features/my/new_ads/ui/buy_new/buy_new_ads.module.scss";
import {Upload_icon} from "@/components/atoms/icons";
import React from "react";
import {ITop_banner_info_input} from "@/components/organisms/ad_input_sections";

export default function Top_banner_info_input({
	banner_info,
	set_banner_info
}: ITop_banner_info_input) {
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