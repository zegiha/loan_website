import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from "@/features/my/new_ads/ui/style.module.scss";
import {CloseIcon} from "@/components/atoms/icons";
import React from "react";

export default function Selected_ads() {
  const {select, setSelect} = useSelect_context()
  return (
    <Col gap={4} width={'fill'}>
      <Typo.Contents color={'dim'}>선택한 광고</Typo.Contents>
      <Row gap={12} width={'fill'} wrap>
        {select.map((v) => (
          <div
            key={v.name}
            className={style.ad_name_chip_button}
            onClick={() => setSelect(prev => prev.filter(e => e !== v))}
          >
            <Row gap={4} alignItems={'center'}>
              <Col gap={4}>
                <Typo.Contents>{v.name}</Typo.Contents>
                <Typo.Caption color={'dim'}>
                  {v.price.toLocaleString()}원
                </Typo.Caption>
              </Col>
              <CloseIcon/>
            </Row>
          </div>
        ))}
      </Row>
    </Col>
  )
}
