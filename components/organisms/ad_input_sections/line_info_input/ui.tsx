import {ILine_info_input} from "@/components/organisms/ad_input_sections";
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseTextInput} from "@/components/molecules/inputs";
import {is_typed} from "@/shared/helper";
import React from "react";

export default function Line_info_input({
	banner_info,
	set_banner_info,
}: ILine_info_input) {
	const to_won = (v: string): string => {
		const to_number = () => {
			let res = 0;
			for(let i = 0; i < v.length; i++) {
				if(v[i] !== ',') {
					res *= 10;
					res += Number(v[i])
				}
			}
			return res
		}
		const num = to_number()
		if (isNaN(num) || num === 0) return '';
		return num.toLocaleString('ko-KR');
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
				<Typo.Caption color={'dim'}>대출한도</Typo.Caption>
				<BaseTextInput
					width={'fill'}
					size={'normal'}
					value={banner_info.loan_limit}
					onChangeAction={(v) => set_banner_info(prev => ({...prev, loan_limit: to_won(v)}))}
					placeholder={'대출한도를 입력해주세요'}
					TypingIcon={<Typo.Contents color={'dim'}>₩</Typo.Contents>}
				/>
			</Col>
		</>
	)
}