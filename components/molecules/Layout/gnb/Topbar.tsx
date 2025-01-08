'use client'

import {Row} from "@/components/atoms/layout";
import {usePathname} from "next/navigation";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import style from './style.module.scss';
import {TNavigation} from "@/shared/type/navigation";

export default function Topbar({
  navigations
}: {
  navigations: Array<TNavigation>
}) {
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
