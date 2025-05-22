import ICertified_company_summary from "@/shared/type/company/ICertified_company_summary";
import {Col, Divider, Row} from "@/components/atoms/layout";
import style from "@/features/loan_certified/ui/style.module.scss";
import Typo from "@/components/atoms/typo/Typo";
import skeleton from '@/shared/constants/skeleton.module.scss'

interface ICertified_company_card extends ICertified_company_summary {
  onClick: () => void
}

export function Certified_company_cardSkeleton() {
  return (
    <Col
      className={style.certified_company_card}
      width={'fill'}
    >
      <Row width={'fill'} justifyContents={'center'}>
        <div
          className={skeleton.skeleton}
          style={{width: '40%', height: 20}}
        />
      </Row>
      <div className={style.divider_wrapper}>
        <Divider/>
      </div>
      <Col gap={4} width={'fill'}>
        {Array.from({length: 3}).map((_, i) => (
          <div
            key={i}
            className={skeleton.skeleton}
            style={{width: '80%', height: 20}}
          />
        ))}
      </Col>
    </Col>
  )
}

export function Certified_company_card({
  registration_number,
  company_name,
  company_location,
  company_owner,
  onClick,
}: ICertified_company_card) {
  const data = [
    {title: '대표자명', contents: company_owner},
    {title: '등록증번호', contents: registration_number},
    {title: '소재지', contents: company_location}
  ]
  return (
    <Col
      className={style.certified_company_card}
      width={'fill'}
      onClick={onClick}
    >
      <Row width={'fill'} justifyContents={'center'}>
        <Typo.Contents emphasize color={'variable'}>
          {company_name}
        </Typo.Contents>
      </Row>
      <div className={style.divider_wrapper}>
        <Divider/>
      </div>
      <Col gap={4} width={'fill'}>
        {data.map(v => (
          <Row key={v.title} gap={6} alignItems={'center'} width={'fill'}>
            <Typo.Contents color={'dim'} width={70}>{v.title}</Typo.Contents>
            <div className={style.contents_divider_wrapper}>
              <Divider height={'fill'} color={'outline'}/>
            </div>
            <Typo.Contents
              width={'fill'}
              textOverflowLine={1}
            >
              {v.contents}
            </Typo.Contents>
          </Row>
        ))}
      </Col>
    </Col>
  )
}
