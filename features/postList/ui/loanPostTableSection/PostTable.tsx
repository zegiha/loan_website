import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {Col, Row} from "@/components/atoms/layout";
import {ILoan_inquiry_data} from "@/shared/type";
import {useLoanboardControllerFindAll} from "@/entities/api/loanboard/loanboard";
import {usePagination} from "@/features/postList/ui/loanPostTableSection/LoanPostTableSection";

interface ILoan_inquiry_row {
  type: 'inquiry'
  value: ILoan_inquiry_data;
}

export default function PostTable({
  dataNumber,
  is_display
}: {
  dataNumber: number
  is_display?: boolean
}) {
  const [show_sub_status, set_show_sub_status] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const {
    limit,
    page, setPage,
    search,
    searchType,
  } = usePagination()

  useEffect(() => {
    console.log(limit, page, search, searchType)
  }, [limit, page, search, searchType])

  const {
    data,
    status,
    error,
  } = useLoanboardControllerFindAll(
    {
      page: page,
      limit: limit,
      type: '전체',
      location: ['전체'],
      search_type: searchType,
      // TODO nullable로 변경
      search: "''"
    },
    {
      query: {
        select: data => {
          const res: Array<ILoan_inquiry_data> = []
          data.data.forEach(v => {
            res.push({
              ...v,
              category: v.type,
              location: v.available_location,
              createdAt: v.updatedAt,
              desired_amount: v.desired_amount.toString()
            })
          })
          return res
      }
    }
  })

  const handleResize = () => {
    if(ref.current) {
      set_show_sub_status(ref.current.offsetWidth > 500)
    }
  }

  const process_to_slide: (rawData: Array<ILoan_inquiry_data>) => Array<Array<ILoan_inquiry_row>> = (rawData) => {
    if(rawData) {
      let i = -1;
      const data: Array<ILoan_inquiry_row> = [];

      rawData.forEach((v) => {
        data.push({type: 'inquiry', value: v});
      })

      const res: Array<Array<ILoan_inquiry_row>> = []
      for(let j = 0; j < data.length; j++) {
        if(j % dataNumber == 0) {
          res.push([])
          i++
        }
        res[i].push(data[j])
      }
      return res
    } else return [[]]
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    console.log(status, error)
  }, [status]);

  return (
    <Row width={'fill'} ref={ref}>
      {status === 'success' && (
        data?.length !== 0 && data !== undefined ? (
          <SwiperPaginationAndNavigation activeSlides={page} setActiveSlides={setPage}>
            {process_to_slide(data).map((slide, index) => (
              <SwiperSlide key={`${index}-slide`}>
                <Table
                  head={<LoanPostTableHead show_sub_status={show_sub_status}/>}
                >
                  {slide.map((data, i) => (
                    <LoanPostTableRow
                      key={`${i}-post`}
                      {...data.value}
                      show_sub_status={show_sub_status}
                      is_display={is_display}
                    />
                  ))}
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
        <Typo.Contents width={60}>희망금액</Typo.Contents>
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
    return `${res.getFullYear()}-${res.getMonth()-1}-${res.getDate()}`
  }

  if(!is_display) {
    return (
      <Link href={`/post/${id}`} style={{ width: "100%" }}>
        <TableRow>
          <Typo.Contents width={30} color={'generic'}>{category}</Typo.Contents>
          <Typo.Contents width={52}>{location}</Typo.Contents>
          <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
          {show_sub_status && (<>
            <Typo.Contents width={60} isPre>{desired_amount}</Typo.Contents>
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
          <Typo.Contents width={60} isPre>{desired_amount}</Typo.Contents>
          <Typo.Contents width={80} color={'dim'} isPre>{parseDate(createdAt)}</Typo.Contents>
        </>)}
      </TableRow>
    </>)
  }
}
