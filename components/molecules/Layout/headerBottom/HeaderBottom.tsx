import {Row} from "@/components/atoms/layout";
import style from './headerBottom.module.scss';
import Typo from "@/components/atoms/typo/Typo";

const items =  [
  [
    {domain: '/loan/list/location', name: '지역별 업체 찾기'},
    {domain: '/loan/list/production', name: '상품별 업체 찾기'},
    {domain: '/search', name: '맞춤 검색'},
    {domain: '/realtime/loan/post/list', name: '실시간 대출 문의'},
  ],
  [
    {domain: '/search/scam', name: '사기 번호 조회'},
    {domain: '/search/registered_company', name: '정식 업체 조회'},
    {domain: '/user_guied', name: '이용안내'},
    {domain: '/customer_service_center', name: '고객센터'}
  ]
];

export default function HeaderBottom() {
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
                {...v}
              />
            ))}
          </Row>
        ))}
      </Row>
    </Row>
  );
}

function NavigationItem({domain, name}: {domain: string, name: string}) {
  return (
    <span
      onClick={() => {
      }}
    >
      <Typo.SubBody
        className={style.navigation}
      >
        {name}
      </Typo.SubBody>
    </span>
  );
}
