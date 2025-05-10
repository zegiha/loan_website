import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {Row} from "@/components/atoms/layout";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_data} from "@/shared/type";
import {get_loan_inquiry} from "@/shared/api";

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
  const {
    data: loan_inquiry_data,
    // is_loading: loan_inquiry_loading,
    // error: loan_inquiry_error,
    // refetch: loan_inquiry_refetch,
  } = useFetch(() => get_loan_inquiry());
  const [show_sub_status, set_show_sub_status] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_show_sub_status(ref.current.offsetWidth > 500)
    }
  }

  const process_to_slide: () => Array<Array<ILoan_inquiry_row>> = () => {
    if(loan_inquiry_data) {
      let i = -1;
      const data: Array<ILoan_inquiry_row> = [];

      loan_inquiry_data.forEach((v) => {
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

  return (
    <Row width={'fill'} ref={ref}>
      <SwiperPaginationAndNavigation>
        {process_to_slide().map((slide, index) => (
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
        <Typo.Contents width={60}>작성시간</Typo.Contents>
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
  if(!is_display) {
    return (
      <Link href={`/post/${id}`} style={{ width: "100%" }}>
        <TableRow>
          <Typo.Contents width={30} color={'generic'}>{category}</Typo.Contents>
          <Typo.Contents width={52}>{location}</Typo.Contents>
          <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
          {show_sub_status && (<>
            <Typo.Contents width={60} isPre>{desired_amount}</Typo.Contents>
            <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
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
          <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
        </>)}
      </TableRow>
    </>)
  }
}
