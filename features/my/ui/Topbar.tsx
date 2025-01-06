'use client'

import {Row} from "@/components/atoms/layout";
import {usePathname} from "next/navigation";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import style from './style.module.scss';

type TNavigation = {domain: string, name: string}
const navigations: Array<TNavigation> = [
  {domain: '/my/ads', name: '나의 광고'},
  {domain: '/my/ads/new', name: '광고 추가하기'},
  {domain: '/my/logout', name: '로그아웃'},
  {domain: '/my/leave', name: '회원탈퇴'}
]

export default function Topbar() {
  const pathname = usePathname();
  return (
    <Row className={style.topbar_container}>
      <Row gap={24} style={{padding: 16}} wrap>
        {navigations.map((v, i) => (
          <Link key={i} href={v.domain} style={{cursor: 'pointer'}}>
            <Typo.Contents
              color={pathname === v.domain ? 'primary' : 'generic'}
            >
              {v.name}
            </Typo.Contents>
          </Link>
        ))}
      </Row>
    </Row>
  );
}
