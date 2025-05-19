import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import Select from "@/components/molecules/inputs/select/Select";
import {location_list} from "@/shared/constants";
import React, {useEffect} from "react";
import {IPremium_banner_info_input} from "@/components/organisms/ad_input_sections";

export default function Premium_banner_info_input({
	banner_info, set_banner_info,
	selected_available_location_idx, set_selected_available_location_idx,
}: IPremium_banner_info_input) {

	useEffect(() => {
		set_banner_info(p => ({
			...p,
			location: selected_available_location_idx.map(v => (location_list[v]))
		}));
	}, [selected_available_location_idx]);

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
				<Typo.Caption color={'dim'}>대출 가능 지역</Typo.Caption>
				<Select
					placeholder={'대출 가능 지역을 선택해주세요'}
					option={location_list}
					selected_idx={selected_available_location_idx}
					set_selected_idx={set_selected_available_location_idx}
					max_option_item_show={5}
					selectNumber={location_list.length}
				/>
			</Col>
		</>
	)
}
