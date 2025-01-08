import {useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import style from './style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {ArrowIcon} from "@/components/atoms/icons";

export default function Faq_item({
  title,
  contents
}: {
  title: string
  contents: string
}) {
  const [active, set_active] = useState<boolean>(false)

  return (
    <Col width={'fill'} gap={16} className={style.faq_item_container} onClick={() => set_active(prev => !prev)}>
      <Row width={'fill'} gap={16}>
        <Typo.SubBody emphasize color={'variable'} isPre={'wrap'} width={'fill'}>
          {title}
        </Typo.SubBody>
        <span onClick={(e) => {
          e.stopPropagation()
          set_active(prev => !prev)
        }}>
          <ArrowIcon color={'dim'} deg={active ? -90 : 90}/>
        </span>
      </Row>
      {active && (
        <Row width={'fill'} className={style.faq_item_contents}>
          <Typo.Contents isPre={'wrap'}>
            {contents}
          </Typo.Contents>
        </Row>
      )}
    </Col>
  )
}
