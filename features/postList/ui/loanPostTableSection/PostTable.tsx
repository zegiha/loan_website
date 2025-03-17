import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import {Row} from "@/components/atoms/layout";
import {useFetch} from "@/shared/hooks";
import {ILoan_inquiry_data, INotification_data} from "@/shared/type";
import {get_loan_inquiry, get_notification} from "@/shared/api";
import style from './loanPostTableSection.module.scss'

interface INotification_row {
  type: 'notification'
  value: INotification_data;
}
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
    data: notification_data,
    is_loading: notification_is_loading,
    error: notification_error,
    refetch: notification_refetch,
  } = useFetch(() => get_notification());
  const {
    data: loan_inquiry_data,
    is_loading: loan_inquiry_loading,
    error: loan_inquiry_error,
    refetch: loan_inquiry_refetch,
  } = useFetch(() => get_loan_inquiry());
  const [show_sub_status, set_show_sub_status] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_show_sub_status(ref.current.offsetWidth > 500)
    }
  }

  const process_to_slide: () => Array<Array<INotification_row | ILoan_inquiry_row>> = () => {
    if(loan_inquiry_data && notification_data) {
      let i = -1;
      const data: Array<INotification_row | ILoan_inquiry_row> = [];
      notification_data.forEach((v) => {
        data.push({type: 'notification', value: v});
      })
      loan_inquiry_data.forEach((v) => {
        data.push({type: 'inquiry', value: v});
      })

      const res: Array<Array<INotification_row | ILoan_inquiry_row>> = []
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
                data.type === 'notification' ? (
                  <Notification_table_row
                    key={`${i}-notification`}
                    {...data.value}
                    show_sub_status={show_sub_status}
                    is_display={is_display}
                  />
                ) : (
                  <LoanPostTableRow
                    key={`${i}-post`}
                    {...data.value}
                    show_sub_status={show_sub_status}
                    is_display={is_display}
                  />
                )
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
        <Typo.Contents width={60}>작성시간</Typo.Contents>
        <Typo.Contents width={60}>조회수</Typo.Contents>
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
  views,
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
            <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
            <Typo.Contents width={60} isPre>{views}</Typo.Contents>
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
          <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
          <Typo.Contents width={60} isPre>{views}</Typo.Contents>
        </>)}
      </TableRow>
    </>)
  }
}

interface INotification_table_props extends INotification_data {
  show_sub_status: boolean;
  is_display?: boolean;
}
function Notification_table_row({
  id,
  title,
  views,
  show_sub_status,
  is_display,
}: INotification_table_props) {
  if(!is_display) {
    return (
      <Link href={`/post/${id}`} style={{ width: "100%" }}>
        <TableRow className={style.notificationRow}>
          <Typo.Contents width={30} color={'primary'}>공지</Typo.Contents>
          <Typo.Contents width={52}>{''}</Typo.Contents>
          <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
          {show_sub_status && (<>
            <Typo.Contents width={60} color={'dim'} isPre>{''}</Typo.Contents>
            <Typo.Contents width={60} isPre>{views}</Typo.Contents>
          </>)}
        </TableRow>
      </Link>
    )
  } else {
    return (<>
      <TableRow className={style.notificationRow}>
        <Typo.Contents width={30} color={'primary'}>공지</Typo.Contents>
        <Typo.Contents width={52}>{''}</Typo.Contents>
        <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
        {show_sub_status && (<>
          <Typo.Contents width={60} color={'dim'} isPre>{''}</Typo.Contents>
          <Typo.Contents width={60} isPre>{views}</Typo.Contents>
        </>)}
      </TableRow>
    </>)
  }
}
