'use client'

import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {TableHead, TableRow} from "@/components/molecules";
import Link from "next/link";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_data} from "@/shared/type";
import {get_loan_inquiry} from "@/shared/api";
import {useEffect, useState} from "react";
import {loanboardControllerFindAll} from "@/entities/api/loanboard/loanboard";
import {LoanboardResponseDto} from "@/entities/const";
import get_YYYYMMDD from "@/shared/helper/get_YYYYMMDD";

export default function RealTimeLoanTable() {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<Array<ILoan_inquiry_data> | null>(null)

  const loanboardResponseDtoToILoan_inquiry_data = (v: Array<LoanboardResponseDto>): Array<ILoan_inquiry_data> => {
    const res: Array<ILoan_inquiry_data> = []
    v.forEach(v => {
      res.push({
        ...v,
        category: v.type,
        desired_amount: v.desired_amount.toString(),
        createdAt: get_YYYYMMDD(new Date(v.updatedAt)),
        location: v.available_location
      })
    })
    return [...res]
  }

  const handleFetching = async () => {
    try {
      const res = await loanboardControllerFindAll({
        page: page,
        limit: 20,
        type: '전체',
        location: ['전체'],
      })
      setData(p => {
        if(p === null) return [...loanboardResponseDtoToILoan_inquiry_data(res.data)]
        return [...p, ...loanboardResponseDtoToILoan_inquiry_data(res.data)]
      })
      setPage(p => p + 1)
    } catch(e) {
      console.error('RealTimeLoanTable: ', e)
    }
  }

  useEffect(() => {
    console.log(data)
    handleFetching()
    return () => {
      console.log('??')
      setData(null)
      console.log(data)
    }
  }, []);

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
    <Typo.Contents width={90}>
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
      <Typo.Contents width={90} color={'dim'}>
        {createdAt}
      </Typo.Contents>
    </TableRow>
  </Link>
}
