'use client'

import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {loanboardControllerFindAll} from '@/entities/api/loanboard/loanboard'
import {PaginationResponseDto} from '@/entities/const'
import load from '@/public/assets/load_dot_120.json'
import {semantic_object} from "@/shared/color";
import {BaseButton, iconButton} from "@/components/molecules/inputs";
import style from "@/features/home/PremiumBannerAndRealTimeLoanSection/premiumBannerAndRealTimeLoanSection.module.scss";
import {useInfiniteScroll} from '@/shared/hooks'
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import React, {Ref, useEffect, useState} from "react";
import {PlusIcon, SearchIcon} from "@/components/atoms/icons";
import {useRouter} from "next/navigation";
import {ILoan_inquiry_data} from "@/shared/type";
import Link from "next/link";
import {DateTime} from "luxon";
import get_YYYYMMDD from "@/shared/helper/get_YYYYMMDD";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)


function getTimeAgo(date: string | Date): string {
  const now = DateTime.now();
  const target = DateTime.fromISO(typeof date === "string" ? date : new Date(date).toISOString());

  const diff = now.diff(target, ["days", "hours", "minutes", "seconds"]).toObject();

  if (diff.days && diff.days >= 1) {
    return `${Math.floor(diff.days)}일 전`;
  } else if (diff.hours && diff.hours >= 1) {
    return `${Math.floor(diff.hours)}시간 전`;
  } else if (diff.minutes && diff.minutes >= 1) {
    return `${Math.floor(diff.minutes)}분 전`;
  } else {
    return "방금 전";
  }
}

export default function RealTimeLoanSection({bannerHeight}: {bannerHeight: number}) {
  const router = useRouter()
  const [total, setTotal] = useState<number>(-1)

  const parseApiToArrayILoanInquiryData = (v: InfiniteData<PaginationResponseDto, unknown>) => {
    const res: Array<ILoan_inquiry_data> = []
    v.pages.forEach(v => {
      v.data.forEach(v => {
        res.push({
          id: v.id,
          category: v.type,
          location: v.available_location,
          title: v.title,
          createdAt: getTimeAgo(v.writed_date),
          desired_amount: v.desired_amount.toLocaleString()
        })
      })
    })
    return res
  }

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['todayLoanboard'],
    queryFn: async ({pageParam}) => {
      return await loanboardControllerFindAll({
        page: pageParam,
        limit: 20,
        onlyToday: true,
        type: '전체',
        location: ['전체'],
        search_type: 'title',
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if(lastPage.page === lastPage.totalPages)
        return undefined
      return lastPage.page + 1
    },
  })

  const {setTarget} = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  )

  useEffect(() => {
    if(data) {
      if(total === -1 || total !== data.pages[data.pages.length - 1].total)
        setTotal(data.pages[data.pages.length - 1].total)
    }
  }, [data])

  return (
    <>
      <Row width={'fill'} justifyContents={'space-between'} alignItems={'center'}>
        <Typo.SubBody emphasize color={'variable'}>
          실시간 대출 문의
          {total !== -1 ? (
            <>
              <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
                {` ${total}`}
              </span>
              건
            </>
          ):(
            <span style={{color: semantic_object.onGeneric.onGenericDim}}>
              로딩중
            </span>
          )}
        </Typo.SubBody>
        <BaseButton
          className={`${iconButton.iconButton40}`}
          onClick={() => router.push('/post/create')}
        >
          <PlusIcon/>
        </BaseButton>
      </Row>
      <Col width={'fill'} className={style.realTimeLoanContainer}>
        {status === 'success' && data && (
          data.pages[0].data.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              direction={'vertical'}
              spaceBetween={4}
              slidesPerView={bannerHeight ? Math.floor((bannerHeight - 112) / 48) : 0}
              loop={true}
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
              }}
              style={{height: '100%'}}
            >
              {parseApiToArrayILoanInquiryData(data).map((v, i) => (
                i !== parseApiToArrayILoanInquiryData(data).length-1 ? (
                  <SwiperSlide key={i} style={{height: 'max-content'}}>
                    <RealTimeLoan {...v}/>
                  </SwiperSlide>
                ) : (
                  <SwiperSlide key={i} style={{height: 'max-content'}}>
                    <RealTimeLoan
                      ref={setTarget}
                      {...v}
                    />
                  </SwiperSlide>
                )
              ))}
            </Swiper>
          ) : (
            <Col
              width={'fill'}
              justifyContents={'center'}
              alignItems={'center'}
              gap={12}
            >
              <SearchIcon
                size={48}
                color={'dim'}
              />
              <Typo.SubBody color={'dim'} emphasize>
                아직 등록된 대출 문의가 없어요
              </Typo.SubBody>
            </Col>
          )
        )}
        {status === 'pending' && (
          <Player src={load} autoplay loop style={{height: 24}}/>
        )}
      </Col>
    </>
  );
}

function RealTimeLoan({
  ref,
  id,
  title,
  location,
  createdAt
}: {ref?: Ref<HTMLDivElement>} & ILoan_inquiry_data) {
  return (
    <Link href={`/post/${id}`} style={{width: '100%'}}>
      <Row
        ref={ref}
        gap={12}
        alignItems={'center'}
        width={'fill'}
        className={style.realTimeLoan}
      >
        <div className={`${style.locationChip}`}>
          <Typo.Contents color={'dim'}>
            {location}
          </Typo.Contents>
        </div>
        <Typo.Contents width={'fill'} textOverflowLine={1} isPre>
          {title}
        </Typo.Contents>
        <Typo.Caption color={'dim'} width={'hug'} isPre>
          {createdAt}
        </Typo.Caption>
      </Row>
    </Link>
)
  ;
}
