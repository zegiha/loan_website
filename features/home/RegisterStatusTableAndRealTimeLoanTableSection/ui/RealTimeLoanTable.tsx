'use client'

import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {NoData, TableHead, TableRow} from "@/components/molecules";
import {useInfiniteQuery} from '@tanstack/react-query'
import Link from "next/link";
import {useInfiniteScroll} from "@/shared/hooks";
import {ILoan_inquiry_data} from "@/shared/type";
import {Fragment} from "react";
import {loanboardControllerFindAll} from "@/entities/api/loanboard/loanboard";
import {LoanboardResponseDto} from "@/entities/const";
import get_YYYYMMDD from "@/shared/helper/get_YYYYMMDD";

export default function RealTimeLoanTable() {
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

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['loanInquiryFromMain'],
    queryFn: async ({pageParam}) => {
      const data = await loanboardControllerFindAll({
        page: pageParam,
        limit: 10,
        type: '전체',
        location: ['전체'],
      })
      return {
        currentPage: data.page,
        totalPages: data.totalPages,
        data: loanboardResponseDtoToILoan_inquiry_data(data.data)
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if(lastPage.currentPage === lastPage.totalPages) {
        return undefined
      }
      return lastPage.currentPage + 1
    }
  })

  const {setTarget} = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  )

  if(status === 'success') {
    if(data?.pages[0].data.length > 0) {
      return (
        <Table
          head={<RealTimeLoanTableHead/>}
        >
          {(
            data?.pages.map((v, i) => {
              return (
                v.currentPage !== data.pages.length ? (
                  v.data.map((v, i) => (
                    <RealTimeLoanTableRow
                      key={i}
                      {...v}
                    />
                  ))
                ):(
                  v.data.map((v, i) => (
                    <Fragment key={i}>
                      <div ref={setTarget}/>
                      <RealTimeLoanTableRow
                        {...v}
                      />
                    </Fragment>
                  ))
                )
              )
            })
          )}
        </Table>
      )
    } else return <NoData contents={'아직 등록된 대출 문의가 없어요'}/>
  }
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
