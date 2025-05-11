import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import Link from "next/link";
import {Col, Row} from "@/components/atoms/layout";
import get_announcement from "@/features/customer/announcement/api/get_announcement";
import {useNoticeControllerGetNotices} from "@/entities/api/notice/notice";

export default function Announcement_table() {
  const [show_sub_status, set_show_sub_status] = useState(true);

  const {
    data,
    status,
    error,
  } = useNoticeControllerGetNotices({
    query: {
      select: v => {
        const res: Array<IAnnouncement_table_props> = []
        v.forEach(v => {
          res.push({
            ...v,
            post_id: v.id,
            created_date: new Date(v.updatedAt),
            type: v.type === 'normal' ? 'normal' : 'variable',
            show_sub_status,
          })
        })
        return res
      }
    }
  })

  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_show_sub_status(ref.current.offsetWidth > 500);
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const parseTwoDimentions = (v: Array<IAnnouncement_table_props>) => {
    const res: Array<Array<IAnnouncement_table_props>> = []
    let tmp: Array<IAnnouncement_table_props> = []
    v.forEach((v, i) => {
      if(i !== 0 && i % 20 === 0) {
        res.push(tmp)
        tmp = []
      }
      tmp.push(v)
    })
    if(tmp.length > 0) res.push(tmp)
    return res
  }

  return (
    <Row width={'fill'} ref={ref}>
      {status === 'success' && (
        data.length > 0 ? (
          <SwiperPaginationAndNavigation>
            {parseTwoDimentions(data).map((slide, index) => (
              <SwiperSlide key={`${index}-slide`}>
                <Table
                  head={<Announcement_table_head show_sub_status={show_sub_status}/>}
                >
                  {slide.map((post, i) => (
                    <Announcement_table_row key={`${i}-post`} {...post} show_sub_status={show_sub_status}/>
                  ))}
                </Table>
              </SwiperSlide>
            ))}
          </SwiperPaginationAndNavigation>
        ) : (
          <Col
            width={'fill'}
            style={{height: '60vh'}}
            justifyContents={'center'}
            alignItems={'center'}
          >
            <Typo.Body color={'dim'} emphasize>
              아직 올라온 공지가 없어요
            </Typo.Body>
            <Typo.Body color={'dim'} emphasize>
              나중에 뵈요!
            </Typo.Body>
          </Col>
        )
      )}
    </Row>
  )
}

function Announcement_table_head({
  show_sub_status
}: {
  show_sub_status: boolean;
}) {
  return <TableHead>
    <Typo.Contents width={30}>분류</Typo.Contents>
    <Typo.Contents width={'fill'}>제목</Typo.Contents>
    {show_sub_status && (
      <>
        <Typo.Contents width={100}>작성일</Typo.Contents>
        {/*<Typo.Contents width={60}>조회수</Typo.Contents>*/}
      </>
    )}
  </TableHead>
}

interface IAnnouncement_table_props extends IAnnouncement_summary {
  show_sub_status: boolean;
}
function Announcement_table_row({
  post_id,
  type,
  title,
  created_date,
  show_sub_status
}: IAnnouncement_table_props) {
  return <Link href={`/customer/announcement/${post_id}`} style={{ width: "100%" }}>
    <TableRow className={type === 'variable' ? style.notificationRow : undefined}>
      <Typo.Contents width={30} color={type === 'variable' ? 'primary' : 'generic'}>{type === 'variable' ? '중요' : '일반'}</Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
      {show_sub_status && (<>
        <Typo.Contents width={100} color={'dim'} isPre={'nowrap'}>{
          `${created_date.getFullYear()}.${created_date.getMonth() + 1}.${created_date.getDate()}`
        }</Typo.Contents>
      </>)}
    </TableRow>
  </Link>
}
