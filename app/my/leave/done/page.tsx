'use client'

import {Col, Divider, Row} from "@/components/atoms/layout";
import {Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, button} from "@/components/molecules/inputs";
import {ArrowAltIcon} from "@/components/atoms/icons";
import React from "react";
import {useRouter} from "next/navigation";

export default function Page() {
	const router = useRouter();
	return (
		<Col width={'fill'}>
			<Row width={'fill'} justifyContents={'center'} style={{padding: '6px 0'}}>
				<Typo.SubBody>
					**회원탈퇴 페이지는 회원탈퇴 요청이된 컴퓨터에서만 일주일 동안 들어올 수 있어요**
				</Typo.SubBody>
			</Row>
			<Divider/>
			<Section backgroundColor={'surface'}>
				<Col width={'fill'} gap={64}>
					<Col width={'fill'} gap={8}>
						<Typo.Title emphasize color={'variable'}>
							회원 탈퇴가 요청되었어요!
						</Typo.Title>
						<Typo.Contents color={'dim'} isPre={'wrap'}>
							보안을 위해 관리자가 회원탈퇴를 승인해야지만 탈퇴가 완료돼요{'\n'}
							탈퇴가 승인되면 완료 문자를 보내드릴게요
						</Typo.Contents>
					</Col>
					<Row width={'fill'} justifyContents={'end'} gap={16}>
						<BaseButton
							className={button.grayButton44}
							onClick={() => router.push('/')}
						>
							<Typo.SubBody isPre={'nowrap'}>
								홈으로 돌아가기
							</Typo.SubBody>
							<ArrowAltIcon/>
						</BaseButton>
						<BaseButton
							className={button.primary_button44}
							onClick={() => router.push('/')}
						>
							<Typo.SubBody
								color={'onPrimary'}
								isPre={'nowrap'}
							>
								회원탈퇴 취소하기
							</Typo.SubBody>
						</BaseButton>
					</Row>
				</Col>

			</Section>
		</Col>
	)
}