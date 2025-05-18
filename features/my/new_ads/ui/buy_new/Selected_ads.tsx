import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from "@/features/my/new_ads/ui/style.module.scss";
import {CloseIcon} from "@/components/atoms/icons";
import React from "react";
import {TAds_name, TAds_type} from "@/shared/type";
import {use_info_validate_context} from "@/features/my/new_ads/context/info_validate_context";

export default function Selected_ads() {
  const {select, setSelect} = useSelect_context()
  const {set_validate_list} = use_info_validate_context()

  const handleDelete = (adName: TAds_name) => {
    setSelect(prev => prev.filter(e => e.name !== adName))
    set_validate_list(prev => prev.filter(v => v.name !== adName))
  }

  return (
    <Col gap={4} width={'fill'}>
      <Typo.Contents color={'dim'}>선택한 광고</Typo.Contents>
      <Row gap={12} width={'fill'} wrap>
        {select.map((v) => (
          <div
            key={v.name}
            className={style.ad_name_chip_button}
            onClick={() => handleDelete(v.name)}
          >
            <Row gap={4} alignItems={'center'}>
              <Col gap={4}>
                <Typo.Contents>{v.name}</Typo.Contents>
                <Typo.Caption color={'dim'}>
                  {v.price.toLocaleString()}원
                </Typo.Caption>
              </Col>
              {v.type_name !== 'line' && <CloseIcon/>}
            </Row>
          </div>
        ))}
      </Row>
    </Col>
  )
}
