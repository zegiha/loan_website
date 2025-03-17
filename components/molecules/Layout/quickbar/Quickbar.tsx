'use client'

import {Col, Row} from "@/components/atoms/layout";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {Calculate_icon, Search_people_icon} from "@/components/atoms/icons";
import Link from "next/link";
import Image from "next/image";
import get_temp_image from "@/shared/api/get_temp_image";

export default function Quickbar() {
	return (
		<Row
			width={'fill'}
			justifyContents={'end'}
			alignItems={'end'}
			gap={12}
			className={style.wrapper}
		>
			<Link
				href={'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%8C%80%EC%B6%9C%EC%9D%B4%EC%9E%90%EA%B3%84%EC%82%B0%EA%B8%B0'}
				target={'_blank'}
				className={style.button}
				onClick={e => {e.stopPropagation()}}
			>
				<Calculate_icon size={28} fill={false}/>
				<Typo.Contents isPre={'wrap'} textAlign={'start'}>
					{'대출 상환급 이자\n계산하러가기'}
				</Typo.Contents>
			</Link>
			<Link
				href={'https://www.clfa.or.kr/popup_fcsc.asp'}
				target={'_blank'}
				className={style.button}
				onClick={e => {e.stopPropagation()}}
			>
				<Search_people_icon size={28} fill={false}/>
				<Typo.Contents isPre={'wrap'} textAlign={'start'}>
					{'한국 대부 금융협회\n조회하러가기'}
				</Typo.Contents>
			</Link>
			<Link
				href={'/loan/id'}
				className={style.sponsor_link}
				onClick={e => {
					e.stopPropagation()
				}}
			>
				<Col>
					<Typo.Contents
						className={style.sponsor_link_contents}
						isPre={'wrap'}
						textAlign={'center'}
						emphasize
						color={'variable'}
					>
						{'제목제목제목제목'}
					</Typo.Contents>
					<Typo.Contents
						className={style.sponsor_link_contents}
						isPre={'wrap'}
						textAlign={'center'}
					>
						{'이름이름이름'}
					</Typo.Contents>
				</Col>
				<div className={style.blur}/>
				<Image src={get_temp_image()} alt={'sponsor_img'} fill/>
			</Link>
		</Row>
	)
}