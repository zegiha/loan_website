import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {Col, Row} from "@/components/atoms/layout";
import {ILoan_inquiry_data} from "@/shared/type";
import {loanboardControllerFindAll} from "@/entities/api/loanboard/loanboard";
import {usePagination} from "@/features/postList/ui/loanPostTableSection/LoanPostTableSection";
import {useInfiniteQuery} from "@tanstack/react-query";
import skeleton from '@/shared/constants/skeleton.module.scss'

interface ILoan_inquiry_row {
  type: 'inquiry'
  value: ILoan_inquiry_data;
}

export default function PostTable({
  dataNumber,
  is_display,
  activeLoanTypeCategories,
  activeLocationCategories,
}: {
  dataNumber: number
  is_display?: boolean
  activeLoanTypeCategories: Set<string>
  activeLocationCategories: Set<string>
}) {
  const [show_sub_status, set_show_sub_status] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [fetchMemo, setFetchMemo] = useState<number>(0)
  const [fetchedPage, setFetchedPage] = useState<number>(1)

  const {
    limit,
    page, setPage,
    search,
  } = usePagination()

  const {
    data,
    status,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`loanInquiryPostList-${search}-${limit}`],
    queryFn: async ({pageParam}) => {
      return await loanboardControllerFindAll({
        page: pageParam,
        type: activeLoanTypeCategories.size > 0 ? Array.from(activeLoanTypeCategories)[0] : '전체',
        location: activeLocationCategories.size > 0 ? Array.from(activeLocationCategories): ['전체'],
        limit: limit,
        search_type: 'title',
        search,
      })
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if(lastPage.page === lastPage.totalPages)
        return undefined
      return lastPage.page + 1
    },
    select: v => {
      const res: Array<Array<ILoan_inquiry_data> | null> = []
      v.pages.forEach(v => {
        const newItem: Array<ILoan_inquiry_data> = []
        v.data.forEach(v => {
          newItem.push({
            ...v,
            category: v.type,
            location: v.available_location,
            createdAt: v.updatedAt,
            desired_amount: v.desired_amount.toString()
          })
        })
        res.push([...newItem])
      })
      for(let i = res.length; i < v.pages[0].totalPages; i++)
        res.push(null)

      return {
        data: res,
        maxPage: v.pages[0].totalPages
      }
    }
  })

  const handleResize = () => {
    if(ref.current) {
      set_show_sub_status(ref.current.offsetWidth > 500)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setMaxPage(1)
    setPage(1)
    setFetchedPage(1)
    setFetchMemo(0)
    refetch()
  }, [search, limit, activeLoanTypeCategories, activeLocationCategories]);

  useEffect(() => {
    if(!isFetchingNextPage) {
      if(hasNextPage)
        fetchNextPage()
          .then(() => {
            setFetchMemo(p => p-1)
            setFetchedPage(p => p + 1)
          })
      else
        setFetchMemo(0)
    }
  }, [fetchMemo]);

  useEffect(() => {
    if(
      data &&
      maxPage < data.maxPage
    )
      setMaxPage(data.maxPage)
  }, [data, maxPage]);

  return (
    <Row width={'fill'} ref={ref}>
      {status === 'success' && (
        data !== undefined && data.data[0] !== null && data.data[0].length > 0 ? (
          <SwiperPaginationAndNavigation
            activeSlides={page}
            setActiveSlides={setPage}
            maxSlideLength={maxPage}
            onSlideChangeCallback={s => {
              if(fetchedPage + fetchMemo < s.activeIndex + 1)
                setFetchMemo(p => p + s.activeIndex + 1 - fetchedPage - p)
            }}
          >
            {data.data.map((v, i) => (
              <SwiperSlide key={i}>
                <Table
                  head={<LoanPostTableHead show_sub_status={show_sub_status}/>}
                >
                  {v !== null ? (
                    v.map((data, i) => (
                      <LoanPostTableRow
                        key={`${i}-post`}
                        {...data}
                        show_sub_status={show_sub_status}
                        is_display={is_display}
                      />
                    ))
                  ):(
                    Array.from({length: limit}).map((_, i) => (
                      <LoanPostTableRowSkeleton
                        key={i}
                        show_sub_status={show_sub_status}
                      />
                    ))
                  )}
                </Table>
              </SwiperSlide>
            ))}
          </SwiperPaginationAndNavigation>
        ) : (
          <Col
            width={'fill'}
            style={{height: '50vh'}}
            justifyContents={'center'}
            alignItems={'center'}
          >
            <Typo.Body color={'dim'} emphasize>
              아직 등록된 대출 문의가 없어요
            </Typo.Body>
          </Col>
        )
      )}
    </Row>
  )
}

function LoanPostTableHead({
  show_sub_status
}: {
  show_sub_status: boolean;
}) {
  return <TableHead>
    <Typo.Contents width={30}>분류</Typo.Contents>
    <Typo.Contents width={52}>지역</Typo.Contents>
    <Typo.Contents width={'fill'}>제목</Typo.Contents>
    {show_sub_status && (
      <>
        <Typo.Contents width={120}>희망금액</Typo.Contents>
        <Typo.Contents width={80}>작성시간</Typo.Contents>
      </>
    )}
  </TableHead>
}

interface ILoan_inquiry_table_props extends ILoan_inquiry_data {
  show_sub_status: boolean;
  is_display?: boolean;
}
function LoanPostTableRow({
  id,
  category,
  location,
  title,
  createdAt,
  desired_amount,
  show_sub_status,
  is_display,
}: ILoan_inquiry_table_props) {
  const parseDate = (data: string) => {
    const res = new Date(data)
    return `${res.getFullYear()}.${res.getMonth()-1}.${res.getDate()}`
  }

  if(!is_display) {
    return (
      <Link href={`/post/${id}`} style={{ width: "100%" }}>
        <TableRow>
          <Typo.Contents width={30} color={'generic'}>{category}</Typo.Contents>
          <Typo.Contents width={52}>{location}</Typo.Contents>
          <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
          {show_sub_status && (<>
            <Typo.Contents width={120} isPre>{Number(desired_amount).toLocaleString('ko-KR')}</Typo.Contents>
            <Typo.Contents width={80} color={'dim'} isPre>{parseDate(createdAt)}</Typo.Contents>
          </>)}
        </TableRow>
      </Link>
    )
  } else {
    return (<>
      <TableRow>
        <Typo.Contents width={30} color={'generic'}>{category}</Typo.Contents>
        <Typo.Contents width={52}>{location}</Typo.Contents>
        <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
        {show_sub_status && (<>
          <Typo.Contents width={120} isPre>{Number(desired_amount).toLocaleString('ko-KR')}</Typo.Contents>
          <Typo.Contents width={80} color={'dim'} isPre>{parseDate(createdAt)}</Typo.Contents>
        </>)}
      </TableRow>
    </>)
  }
}

function LoanPostTableRowSkeleton({
  show_sub_status
}: {
  show_sub_status: boolean
}) {
  return (
    <TableRow>
      <div className={skeleton.skeleton} style={{width: 30, height: 23.2}}/>
      <div className={skeleton.skeleton} style={{width: 52, height: 23.2}}/>
      <div className={skeleton.skeleton} style={{width: '100%', height: 23.2}}/>
      {show_sub_status && (<>
        <div className={skeleton.skeleton} style={{width: 120, height: 23.2}}/>
        <div className={skeleton.skeleton} style={{width: 80, height: 23.2}}/>
      </>)}
    </TableRow>
  )
}
