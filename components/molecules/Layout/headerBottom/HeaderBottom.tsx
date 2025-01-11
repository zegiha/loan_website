'use client'

import {Row} from "@/components/atoms/layout";
import style from './headerBottom.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import {usePathname, useRouter} from "next/navigation";

const items =  [
  [
    {domain: '/loan/location', name: '지역별 업체 찾기'},
    {domain: '/loan/product', name: '상품별 업체 찾기'},
    {domain: '/post/list', name: '실시간 대출 문의'},
    // {domain: '/search', name: '맞춤 검색'},
  ],
  [
    // {domain: '/search/scam', name: '사기 번호 조회'},
    {domain: '/search/registered_company', name: '정식 업체 조회'},
    {domain: '/guide', name: '이용안내'},
    {domain: '/customer/announcement', name: '고객센터', separator: 'customer'}
  ]
];

export default function HeaderBottom() {
  const router = useRouter()
  const pathName = usePathname()
  return (
    <Row
      width={'fill'}
      justifyContents={'center'}
      className={style.container}
    >
      <Row
        width={'fill'}
        justifyContents={'space-between'}
        alignItems={'center'}
        className={style.wrapper}
      >
        {items.map((v, i) => (
          <Row
            key={i}
            gap={16}
            alignItems={'center'}
          >
            {v.map((v, i) => (
              <NavigationItem
                key={i}
                isActive={v.separator ? pathName.includes(v.separator) : pathName === v.domain}
                onClick={() => router.push(v.domain)}
                name={v.name}
              />
            ))}
          </Row>
        ))}
      </Row>
    </Row>
  );
}

export function NavigationItem({onClick, name, isActive}: {onClick: () => void, name: string, isActive: boolean}) {
  return (
    <span onClick={onClick}>
      <Typo.SubBody
        color={isActive ? 'primary' : undefined}
        className={style.navigation}
      >
        {name}
      </Typo.SubBody>
    </span>
  );
}
