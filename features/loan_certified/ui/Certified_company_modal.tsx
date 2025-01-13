import Modal from "@/components/molecules/modal/Modal";
import style from "@/features/loan_certified/ui/style.module.scss";
import {Col, Row} from "@/components/atoms/layout";
import {CloseIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import Certified_company_table from "@/features/loan_certified/ui/Certified_company_table";
import React from "react";
import ICertified_company from "@/features/loan_certified/lib/ICertified_company";

export default function Certified_company_modal({
  is_open_modal,
  set_is_open_modal,
  data
}: {
  is_open_modal: boolean,
  set_is_open_modal: React.Dispatch<React.SetStateAction<boolean>>,
  data: ICertified_company | null
}) {
  const get_postposition = (v: string) => {
    const last_uni = v[v.length - 1].charCodeAt(0)
    return (last_uni - 0xac00) % 28 === 0 ? '는' : '은';
  }
  return (
    <Modal isOpen={is_open_modal} setIsOpen={set_is_open_modal}>
      <div className={style.modal_container} onClick={(e) => e.stopPropagation()}>
        <Col gap={4}>
          <Row width={'fill'} justifyContents={'end'}>
            <div
              className={style.modal_close}
              onClick={() => set_is_open_modal(false)}
            >
              <CloseIcon/>
            </div>
          </Row>
          <Row width={'fill'} justifyContents={'center'} alignItems={'center'} wrap>
            <Typo.Title emphasize color={'variable'} isPre={'nowrap'}>
              업체명
            </Typo.Title>
            <Typo.Title isPre={'nowrap'}>
              {get_postposition('업체명')}
            </Typo.Title>
            <Typo.Title emphasize color={'primary'} isPre={'nowrap'}>
              정식 등록된 업체
            </Typo.Title>
            <Typo.Title isPre={'nowrap'}>
              입니다
            </Typo.Title>
          </Row>
          <Row width={'fill'} justifyContents={'center'}>
            <Typo.Caption color={'dim'} isPre>
              [본 정보는 금융감독원이 제공하는 정보를 기반으로 작성되었습니다.]
            </Typo.Caption>
          </Row>
        </Col>
        {data && <Certified_company_table {...data}/>}
        <Row width={'fill'} justifyContents={'center'}>
          <Typo.Caption color={'dim'} isPre>
            해당 검색 결과는 2025년 01월 13일 05:00:00 기준 금융감독원에 등록된 정보이며, 자세한 정보 확인은 등록기관으로 문의 부탁드립니다.
          </Typo.Caption>
        </Row>
      </div>
    </Modal>
  )
}
