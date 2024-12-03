import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import {useState} from "react";
import getLoanPostList from "@/shared/api/getLoanPostList";
import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {ILoanPost} from "@/shared/type/loanPost";
import style from './loanPostTableSection.module.scss'
import Link from "next/link";

export default function PostTable({dataNumber}: {dataNumber: number}) {
  const [postList, setPostList] = useState(
    [...getLoanPostList(dataNumber, 50)]
  );
  return (
    <SwiperPaginationAndNavigation>
      {postList.map((slide, index) => (
        <SwiperSlide key={`${index}-slide`}>
          <Table
            head={<LoanPostTableHead/>}
          >
            {slide.map((loanPost, i) => (
              <LoanPostTableRow key={`${i}-post`} {...loanPost}/>
            ))}
          </Table>
        </SwiperSlide>
      ))}
    </SwiperPaginationAndNavigation>
  )
}

function LoanPostTableHead() {
  return <TableHead>
    <Typo.Contents width={30}>분류</Typo.Contents>
    <Typo.Contents width={70}>지역</Typo.Contents>
    <Typo.Contents width={'fill'}>제목</Typo.Contents>
    <Typo.Contents width={60}>작성시간</Typo.Contents>
    <Typo.Contents width={60}>조회수</Typo.Contents>
  </TableHead>
}
function LoanPostTableRow({
  type,
  postId,
  location,
  title,
  createdAt,
  viewCount
}: ILoanPost) {
  return <Link href={`/post/${postId}`} style={{ width: "100%" }}>
    <TableRow className={type === '공지' ? style.notificationRow : undefined}>
      <Typo.Contents width={30} color={type === '공지' ? 'primary' : 'generic'}>{type}</Typo.Contents>
      <Typo.Contents width={70}>{location}</Typo.Contents>
      <Typo.Contents width={'fill'} isPre>{title}</Typo.Contents>
      <Typo.Contents width={60} color={'dim'} isPre>{createdAt}</Typo.Contents>
      <Typo.Contents width={60} isPre>{viewCount}</Typo.Contents>
    </TableRow>
  </Link>
}
