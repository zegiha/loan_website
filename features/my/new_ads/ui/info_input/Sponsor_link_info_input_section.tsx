import {use_banner_info_context} from "@/features/my/new_ads/context/banner_info_context";
import {ISponsor_link_req, TAds_name} from "@/shared/type";
import {useEffect, useState} from "react";
import {Col} from "@/components/atoms/layout";
import {BaseTextInput} from "@/components/molecules/inputs";
import Typo from "@/components/atoms/typo/Typo";

export default function Sponsor_link_info_input_section({
	name
}: {
	name: TAds_name,
}) {
	const {set_ad_req_data} = use_banner_info_context()
	const [ad_info, set_ad_info] = useState<ISponsor_link_req>({
		contents: '',
	})

	useEffect(() => {
		set_ad_req_data(prev => {
			const new_state = prev.filter(v => v.name !== name)
			new_state.push({
				name,
				req_data: ad_info
			})
			return [...new_state]
		})
	}, [ad_info])

	return (
		<>
		  <Col gap={4} width={'fill'}>
			  <Typo.Caption color={'dim'}>내용</Typo.Caption>
			  <BaseTextInput
				  width={'fill'}
				  size={'normal'}
				  value={ad_info.contents}
				  onChangeAction={(v) => set_ad_info(prev => ({...prev, contents: v}))}
				  placeholder={'내용을 입력해주세요'}
			  />
		  </Col>
		</>
	)
}