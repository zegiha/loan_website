'use client'

import Typo from "@/components/atoms/typo/Typo";
import {TableHead, TableRow} from "@/components/molecules";
import {useInfiniteScroll, useLineAdInfiniteQuery} from '@/shared/hooks'
import {ICompany_row, ICompany_row_having_is_visible_company_name} from "@/shared/type";
import {Table} from "@/components/organisms";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Row} from "@/components/atoms/layout";
import {Fragment} from 'react'

export default function RegisterStatusTable() {
  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLineAdInfiniteQuery({
    queryKey: 'mainLine',
    adType: 'main',
    limit: 20,
    select: v => {
      const res: Array<ICompany_row> = []
      v.pages.forEach(v => {
        v.data.forEach(v => {
          res.push({
            id: v.company_id,
            location: v.loan_available_location !== undefined && v.loan_available_location.length > 0 ?
              v.loan_available_location.join(', '):
              '전체',
            loan_limit: v.loan_limit.toLocaleString('ko-KR'),
            title: v.title,
            name: v.company_name,
          })
        })
      })
      return res
    }
  })

  const ref = useRef<HTMLDivElement | null>(null);
  const {
    setTarget
  } = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  )

  const handleResize = () => {
    if(ref.current) set_visible_company_name(ref.current.offsetWidth > 600);
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Row width={'fill'} ref={ref}>
      <Table
        className={'scrollArea'}
        head={<RegisterStatusTableHead visible_company_name={visible_company_name}/>}
      >
        {data && data.map((v, i) => (
          i !== data.length-1 ? (
            <RegisterStatusTableRow
              key={i}
              {...v}
              is_visible_company_name={visible_company_name}
            />
          ):(
            <Fragment key={i}>
              <RegisterStatusTableRow
                {...v}
                is_visible_company_name={visible_company_name}
              />
              <div ref={setTarget}/>
            </Fragment>
          )
        ))}
      </Table>
    </Row>
  );
}

function RegisterStatusTableHead({
  visible_company_name
}: {
  visible_company_name: boolean
}) {
  return <TableHead>
    <Typo.Contents width={70}>
      지역
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

function RegisterStatusTableRow({
  id,
  location,
  title,
  name,
  is_visible_company_name
}: ICompany_row_having_is_visible_company_name) {
  return <Link href={`/loan/${id}`} style={{width:'100%'}}>
    <TableRow>
      <Typo.Contents width={70}>
        {location}
      </Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={1}>
        {title}
      </Typo.Contents>
      {is_visible_company_name && (
        <Typo.Contents width={100} color={'dim'} textOverflowLine={1} isPre={'nowrap'}>
          {name}
        </Typo.Contents>
      )}
    </TableRow>
  </Link>
}
