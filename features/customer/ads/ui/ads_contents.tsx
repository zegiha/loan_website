'use client'

import {Col, Divider, Row} from "@/components/atoms/layout";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {ArrowAltIcon} from "@/components/atoms/icons";
import {BaseButton, button} from "@/components/molecules/inputs";
import {useRouter} from "next/navigation";

const step_data = [
  '회원가입',
  '대부등록증 전송',
  '광고선택',
  '광고비 입금',
  '광고 노출',
]

export default function Ads_contents() {
  const router = useRouter()
  return (
    <Col gap={16} width={'fill'}>
      <Typo.Body emphasize color={'variable'}>
        광고문의
      </Typo.Body>
      <Col gap={32} width={'fill'}>
        <div className={style.container}>
          {step_data.map((v, i) => (
            <div className={style.wrapper} key={i} >
              <Step title={v} step_number={i + 1}/>
              {i !== v.length - 1 && (<span className={style.arrow_wrapper}>
            <ArrowAltIcon color={'dim'}/>
          </span>)}
            </div>
          ))}
        </div>
        <Divider/>
        <Row
          width={'fill'}
          justifyContents={'center'}
          alignItems={'center'}
          gap={24}
          className={style.bottom_container}
        >
          <Col gap={12} width={'fill'}>
            <Typo.Title emphasize color={'variable'}>
              아직 ~의 회원이 아니신가요?
            </Typo.Title>
            <Typo.Contents isPre={'wrap'}>
              {'저렴한 비용으로 엄청난 광고효과를 누릴 수 있어요!\n회원 가입을 통해 달라지는 콜 수로 광고효과를 직접 체감해보세요!'}
            </Typo.Contents>
          </Col>
          <BaseButton className={button.primary_button44} onClick={() => router.push('/register')}>
            <Typo.SubBody color={'onPrimary'} emphasize>
              지금 바로 회원가입
            </Typo.SubBody>
          </BaseButton>
        </Row>
      </Col>
    </Col>
  )
}

function Step({
                title,
                step_number
              }: {
  title: string
  step_number: number
}) {
  return (
    <Col width={240} className={style.step_container} gap={8}>
      <Typo.SubBody>
        {`step.${step_number}`}
      </Typo.SubBody>
      <Typo.Body emphasize color={'primary'}>
        {title}
      </Typo.Body>
    </Col>
  )
}
