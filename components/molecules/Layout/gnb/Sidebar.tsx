'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import style from "./style.module.scss";
import {TNavigation} from "@/shared/type/navigation";

export default function Sidebar({
  title,
  navigations
}: {
  title: string
  navigations: Array<TNavigation>,
}) {
	const pathname = usePathname();
	return (
		<div className={style.sidebar_container}>
			<Col gap={16} width={'fill'}>
				<Typo.SubBody emphasize color={'variable'}>{title}</Typo.SubBody>
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
