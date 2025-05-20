import {Col, Row} from "@/components/atoms/layout";
import {TableHead, TableRow} from "@/components/molecules";
import style from '../style.module.scss'
import Typo from "@/components/atoms/typo/Typo";

function ConsumableAdsTableHead() {
  return <Col width={'fill'}>
    <TableHead className={style.table_row}>
      <Typo.Contents width={'fill'}>광고명</Typo.Contents>
      <Typo.Contents width={'fill'}>남은 사용 횟수</Typo.Contents>
      <Typo.Contents width={'fill'}>사용하기</Typo.Contents>
    </TableHead>
    <div className={style.divider}/>
  </Col>
}

function ConsumableAdsTableRow({
  name,
  remain,
  useFunc
}:{
  name: string,
  remain: number,
  useFunc?: () => void
}) {
  return <TableRow className={style.table_row}>
    <Typo.Contents width={'fill'}>{name}</Typo.Contents>
    <Typo.Contents width={'fill'}>{remain.toLocaleString('ko-KR') + '개'}</Typo.Contents>
    <Typo.Contents
      width={'fill'}
      color={'primary'}
      onClick={useFunc}
      underline
    >
      {useFunc ? '사용하기' : ''}
    </Typo.Contents>
  </TableRow>
}

export {
  ConsumableAdsTableRow,
  ConsumableAdsTableHead,
}
