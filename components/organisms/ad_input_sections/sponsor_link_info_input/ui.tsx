import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import {ISponsor_link_info_input} from "@/components/organisms/ad_input_sections";

export default function Sponsor_link_info_input({
	banner_info,
	set_banner_info
}: ISponsor_link_info_input) {
	return (
		<>
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
		</>
	)
}