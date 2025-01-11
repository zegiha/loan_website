import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React, {useState} from "react";
import Link from "next/link";
import style from './style.module.scss'
import Create_post_profile from "@/features/create_post_profile/ui/profile";
import LoanPostTableSection from "@/features/postList/ui/loanPostTableSection/LoanPostTableSection";

export default function Second() {
  const [activeLoanTypeCategories] = useState<Set <string>>(new Set);
  const [activeLocationCategories] = useState<Set<string>>(new Set);
  return (
    <Col width={'fill'} gap={24}>
      <Col width={'fill'}>
        <Typo.Title emphasize color={'primary'}>
          둘!
        </Typo.Title>
        <Typo.Title emphasize color={'variable'}>
          내가 원하는 대출 문의해서 찾기
        </Typo.Title>
      </Col>
      <div className={style.eg_container}>
        <Link href={'/post/create'} style={{width: '100%'}}>
          <Col
            gap={8}
            alignItems={'center'}
            width={'fill'}
            className={style.eg_item}
          >
            <Create_post_profile is_display={true}/>
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>대출 문의 글 작성</Typo.Contents>
              <div className={style.dot}/>
              <Typo.Contents color={'dim'}>눌러서 작성하기</Typo.Contents>
            </Row>
          </Col>
        </Link>
        <Link href={'/post/list'} className={style.tlqkf_swiper}>
          <Col
            gap={8}
            alignItems={'center'}
            width={'fill'}
            className={style.eg_item}
          >

            <LoanPostTableSection
              activeLoanTypeCategories={activeLoanTypeCategories}
              activeLocationCategories={activeLocationCategories}
              is_display={true}
            />
            <Row gap={4} alignItems={'center'}>
              <Typo.Contents color={'dim'}>대출 문의 글</Typo.Contents>
              <div className={style.dot}/>
              <Typo.Contents color={'dim'}>눌러서 보러가기</Typo.Contents>
            </Row>
          </Col>
        </Link>
      </div>
      <Col>
        <Row gap={12}>
          <Link href={'/post/create'}>
            <Typo.Body color={'primary'} underline className={style.primary_text}>
              실시간 대출 문의 글 작성하기
            </Typo.Body>
          </Link>
          <Link href={'/post/list'}>
            <Typo.Body color={'primary'} underline className={style.primary_text}>
              실시간 대출 문의 글 보러가기
            </Typo.Body>
          </Link>
        </Row>
        <Typo.SubBody color={'dim'}>
          를 이용해서 고객님의 상황에 딱 적합한 상품을 빠르게 받아보세요!
        </Typo.SubBody>
      </Col>
    </Col>
  )
}
