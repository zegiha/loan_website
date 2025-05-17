import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {ICompany_row_having_is_visible_company_name} from "@/shared/type";
import skeleton from '@/shared/constants/skeleton.module.scss'

export function RegisteredCompanyTableHead({
  visible_company_name
}: {
  visible_company_name: boolean;
}) {
  return <TableHead>
    <Typo.Contents width={120}>
      지역
    </Typo.Contents>
    <Typo.Contents width={80}>
      대출한도
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    {visible_company_name && (
      <Typo.Contents width={100}>
        업체명
      </Typo.Contents>
    )}
  </TableHead>
}

export function RegisteredCompanyTableRowSkeleton({
  is_visible_company_name
}: {
  is_visible_company_name: boolean
}) {
  return <TableRow>
    <div className={skeleton.skeleton} style={{width: 120, height: 20}}/>
    <div className={skeleton.skeleton} style={{width: 80, height: 20}}/>
    <div className={skeleton.skeleton} style={{width: '100%', height: 20}}/>
    {is_visible_company_name && (
      <div className={skeleton.skeleton} style={{width: 100, height: 20}}/>
    )}
  </TableRow>
}

export function RegisteredCompanyTableRow({
  id,
  location,
  loan_limit,
  title,
  name,
  is_visible_company_name
}: ICompany_row_having_is_visible_company_name) {
  return <Link href={`/loan/${id}`} style={{width: '100%'}}>
    <TableRow>
      <Typo.Contents width={120} textOverflowLine={1}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={80}>
        {loan_limit}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      {is_visible_company_name && (
        <Typo.Contents width={100} textOverflowLine={1}>
          {name}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
