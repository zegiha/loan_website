import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import Link from "next/link";
import {Row} from "@/components/atoms/layout";
import get_announcement from "@/features/customer/announcement/api/get_announcement";

export default function Announcement_table() {
  const [postList, setPostList] = useState(
    [...get_announcement(50)]
  );
  const [show_sub_status, set_show_sub_status] = useState(true);
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

  return (
    <Row width={'fill'} ref={ref}>
      <SwiperPaginationAndNavigation>
        {postList.map((slide, index) => (
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
        <Typo.Contents width={60}>조회수</Typo.Contents>
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
  view_cnt,
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
        <Typo.Contents width={60} isPre>{view_cnt}</Typo.Contents>
      </>)}
    </TableRow>
  </Link>
}
