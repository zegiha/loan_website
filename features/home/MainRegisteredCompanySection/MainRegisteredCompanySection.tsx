'use client'

import {CompanyCardGrid} from "@/components/organisms";
import Section from "@/components/molecules/Layout/section/Section";
import {formatting_phone_number} from '@/shared/helper'
import {useAdSearchInfiniteQuery, useInfiniteScroll} from "@/shared/hooks";
import {Banner, NoData} from "@/components/molecules";
import {ICompany_banner_data} from "@/shared/type";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function MainRegisteredCompanySection() {
  const {
    data,
    status,
    // error,
    // refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdSearchInfiniteQuery({
    queryKey: 'mainBanner',
    adType: '메인 배너광고',
    limit: 20,
    select: v => {
      const res: Array<ICompany_banner_data> = []
      v.pages.forEach((v) => {
        v.data.forEach((v) => {
          res.push({
            id: v.id,
            title: v.title ?? '',
            subtitle: v.sub_title ?? '',
            name: v.user.companyName,
            img_url: v.cover_img ?? v.image_url,
            phone: formatting_phone_number(v.user.advertisementTel),
            location: v.loan_available_location ?
              v.loan_available_location.slice(0, 2).join(', ') :
              '전체'
          })
        })
      })
      return res
    }
  })

  const {setTarget} = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  )

  return (
    <Section backgroundColor={'surfaceDim'}>
      {status === 'success' && (
        <>
          {data.length > 0 ? (
            <CompanyCardGrid>
              {data && data.map((v, i) => (
                <Banner
                  key={i}
                  {...v}
                />
              ))}
            </CompanyCardGrid>
          ):(
            <NoData contents={'아직 등록된 배너가 없어요'}/>
          )}
          <div ref={setTarget} style={{width: '100%'}}>
            {isFetchingNextPage && <Player src={load} autoplay loop style={{height: 24}} />}
          </div>
        </>
      )}
    </Section>
  );
}


