import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import get_ads from "@/features/my/new_ads/api/get_ads";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from "@/features/my/new_ads/ui/style.module.scss";
import {CloseIcon} from "@/components/atoms/icons";
import React from "react";

export default function Selected_ads() {
  const {select, setSelect} = useSelect_context()
  const ads = get_ads();
  return (
    <Col gap={4} width={'fill'}>
      <Typo.Contents color={'dim'}>선택한 광고</Typo.Contents>
      <Row gap={12} width={'fill'} wrap>
        {select.map((v) => (
          <div
            key={v}
            className={style.ad_name_chip_button}
            onClick={() => setSelect(prev => prev.filter(e => e !== v))}
          >
            <Row gap={4} alignItems={'center'}>
              <Col gap={4}>
                <Typo.Contents>{v}</Typo.Contents>
                <Typo.Caption color={'dim'}>
                  {ads[ads.findIndex(e => e.name === v)].price.toLocaleString()}원
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
