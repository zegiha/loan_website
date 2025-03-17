'use client'

import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {TableHead, TableRow} from "@/components/molecules";
import Link from "next/link";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_data} from "@/shared/type";
import {get_loan_inquiry} from "@/shared/api";

export default function RealTimeLoanTable() {
  const {data} = useFetch(()=> get_loan_inquiry())
  return (
    <Table
      head={<RealTimeLoanTableHead/>}
    >
      {data && data.map((v, i) => (
        <RealTimeLoanTableRow
          key={i}
          {...v}
        />
      ))}
    </Table>
  );
}

function RealTimeLoanTableHead() {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    <Typo.Contents width={60}>
      작성시간
    </Typo.Contents>
  </TableHead>
}

function RealTimeLoanTableRow({
  id,
  location,
  title,
  createdAt,
}: ILoan_inquiry_data) {
  return <Link href={`/post/${id}`} style={{width: '100%'}}>
    <TableRow>
      <Typo.Contents width={70}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      <Typo.Contents width={60} color={'dim'}>
        {createdAt}
      </Typo.Contents>
    </TableRow>
  </Link>
}
