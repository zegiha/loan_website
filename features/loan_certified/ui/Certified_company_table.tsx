import {Table} from "@/components/organisms";
import {TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import ICertified_company from "@/features/loan_certified/lib/ICertified_company";
import get_YYYYMMDD from "@/shared/helper/get_YYYYMMDD";
import style from './style.module.scss'
import {Divider} from "@/components/atoms/layout";

interface ITable_data {
  title: string
  contents: string
}

export default function Certified_company_table({
  company_location,
  company_owner,
  company_name,
  advertising_phone,
  registration_number,
  registrar,
  registration_period,
}: ICertified_company) {
  const data: Array<ITable_data> = [
    {title: '업체명', contents: company_name},
    {title: '대표자명', contents: company_owner},
    {title: '광고용 전화번호', contents: advertising_phone},
    {title: '소재지', contents: company_location},
    {title: '등록번호', contents: registration_number},
    {title: '등록 유효기간', contents: `${get_YYYYMMDD(registration_period.start)} ~ ${get_YYYYMMDD(registration_period.end)}`},
    {title: '대부업 등록기관', contents: registrar},
  ]
  return (
    <Table className={style.table}>
      {data.map(v => <Certified_company_table_row key={v.title} {...v} />)}
    </Table>
  )
}

function Certified_company_table_row({
  title,
  contents
}: ITable_data) {
  return (
    <>
      <TableRow className={style.table_row}>
        <Typo.Contents width={102}>
          {title}
        </Typo.Contents>
        <Typo.Contents width={'fill'} className={style.table_row_min_width}>
          {contents}
        </Typo.Contents>
      </TableRow>
      {title !== '대부업 등록기관' && <div className={style.table_divider_wrapper}><Divider/></div>}
    </>
  )
}
