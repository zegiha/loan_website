'use client'

import {Col, Row} from "@/components/atoms/layout";
import {useAdsPublicControllerSearchAds} from '@/entities/api/advertisement-public/advertisement-public'
import {useRandomImage} from '@/shared/hooks'
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {Calculate_icon, Search_people_icon} from "@/components/atoms/icons";
import Link from "next/link";
import Image from "next/image";

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
			<SponsorLinkSection/>
		</Row>
	)
}

function SponsorLinkSection() {
	const {
		data,
		status,
		error,
	} = useAdsPublicControllerSearchAds(
		'스폰서 링크',
		'1',
		'2',
		{},
		{
			query: {
				select: v => {
					const res: Array<ISponsorLink> = []
					v.ads.forEach(v => {
						res.push({
							title: v.title ?? v.sub_title ?? v.contents ?? '',
							companyId: v.company_id,
							companyName: v.user.companyName,
							img: v.image_url ?? v.cover_img,
						})
					})
					return res
				}
			}
		}
	)

	if(status === 'success' && data?.length > 0) {
		return data?.map((v, i) => (
			<Sponsor_link
				key={i}
				{...v}
			/>
		))
	}
}

interface ISponsorLink {
	title: string
	companyId: string
	companyName: string
	img?: string
}

function Sponsor_link({
	title,
	companyId,
	companyName,
	img: defaultImg
}: ISponsorLink) {
	const {img} = useRandomImage(defaultImg)

	return (
		<Link
			href={`/loan/${companyId}`}
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
					{title}
				</Typo.Contents>
				<Row width={'fill'} justifyContents={'center'}>
					<Typo.Contents
						className={style.sponsor_link_contents}
						isPre={'wrap'}
					>
						{companyName}
					</Typo.Contents>
				</Row>
			</Col>
			<div className={style.blur}/>
			{img && <Image src={img} alt={'sponsor_img'} fill/>}
		</Link>
	)
}
