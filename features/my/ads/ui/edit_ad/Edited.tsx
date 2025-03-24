import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";

export default function Edited() {
	return(
		<Col gap={32} width={'fill'}>
			<Col gap={8} width={'fill'}>
				<Typo.Title color={'variable'} emphasize>
					수정 완료됐어요!
				</Typo.Title>
				<Typo.Contents color={'dim'} isPre={'wrap'}>
					수정 내용 확인 후 배너에 적용돼요{'\n'}
					배너에 적용되면 확인 문자를 보내드릴게요
				</Typo.Contents>
			</Col>
		</Col>
	)
}