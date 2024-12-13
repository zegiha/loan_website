import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import getLoanPostList from "@/shared/api/getLoanPostList";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {ILoanPost} from "@/shared/type/loanPost";
import style from './loanPostTableSection.module.scss'
import Link from "next/link";
import {Row} from "@/components/atoms/layout";

export default function PostTable({dataNumber}: {dataNumber: number}) {
  const [postList, setPostList] = useState(
    [...getLoanPostList(dataNumber, 50)]
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
              head={<LoanPostTableHead show_sub_status={show_sub_status}/>}
            >
              {slide.map((loanPost, i) => (
                <LoanPostTableRow key={`${i}-post`} {...loanPost} show_sub_status={show_sub_status}/>
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

interface ILoanPostTableProps extends ILoanPost {
  show_sub_status: boolean;
}
function LoanPostTableRow({
  type,
  postId,
  location,
  title,
  createdAt,
  viewCount,
  show_sub_status
}: ILoanPostTableProps) {
  return <Link href={`/post/${postId}`} style={{ width: "100%" }}>
    <TableRow className={type === '공지' ? style.notificationRow : undefined}>
      <Typo.Contents width={30} color={type === '공지' ? 'primary' : 'generic'}>{type}</Typo.Contents>
      <Typo.Contents width={52}>{location}</Typo.Contents>
      <Typo.Contents width={'fill'} textOverflowLine={2} isPre>{title}</Typo.Contents>
      {show_sub_status && (<>
        <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
        <Typo.Contents width={60} isPre>{viewCount}</Typo.Contents>
      </>)}
    </TableRow>
  </Link>
}
