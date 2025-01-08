import {Col} from "@/components/atoms/layout";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {ArrowAltIcon} from "@/components/atoms/icons";

const step_data = [
  '회원가입',
  '대부등록증 전송',
  '광고선택',
  '광고비 입금',
  '광고 노출',
]

export default function Ads_contents() {
  return (
    <div className={style.container}>
      {step_data.map((v, i) => (
        <>
          <Step key={i} title={v} step_number={i + 1}/>
          {i !== v.length-1 && (<span key={`${i}_arrow`} className={style.arrow_wrapper}>
            <ArrowAltIcon color={'dim'}/>
          </span>)}
        </>
      ))}
    </div>
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
