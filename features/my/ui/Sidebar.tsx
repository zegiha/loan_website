'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import style from "./style.module.scss";

type TNavigation = {domain: string, name: string}
const navigations: Array<TNavigation> = [
	{domain: '/my/ads', name: '나의 광고'},
	{domain: '/my/ads/new', name: '광고 추가하기'},
	{domain: '/my/logout', name: '로그아웃'},
  {domain: '/my/leave', name: '회원탈퇴'}
]

export default function Sidebar() {
	const pathname = usePathname();
	return (
		<div className={style.sidebar_container}>
			<Col gap={16} width={'fill'}>
				<Typo.SubBody emphasize color={'variable'}>마이페이지</Typo.SubBody>
				<Col gap={12} width={'fill'}>
					{navigations.map((v) => (
						<Link
							key={v.name}
							href={v.domain}
							className={[
								pathname !== v.domain ?
									style.sidebar_item : style.sidebar_item_active,
								pathname === v.domain && (v.name === '로그아웃' || v.name === '회원탈퇴') ?
									style.sidebar_item_red : ''
							].join(' ')}
						>
							<Typo.Contents color={'dim'}>
								{v.name}
							</Typo.Contents>
						</Link>
					))}
				</Col>
			</Col>
		</div>
	);
}
