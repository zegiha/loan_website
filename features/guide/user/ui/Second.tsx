import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";

export default function Second() {
  return (
    <Col width={'fill'} gap={24}>
      <Col width={'fill'}>
        <Typo.Title emphasize color={'primary'}>
          하나
        </Typo.Title>
        <Typo.Title emphasize color={'variable'}>
          나에게 딱 맞는 업체 찾기
        </Typo.Title>
      </Col>
    </Col>
  )
}
