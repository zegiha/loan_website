'use client'

import {CompanyCardGrid} from "@/components/organisms";
import Section from "@/components/molecules/Layout/section/Section";
import {
  adsPublicControllerSearchAds,
  useAdsPublicControllerSearchAds
} from '@/entities/api/advertisement-public/advertisement-public'
import {userControllerProfileById} from '@/entities/api/user/user'
import {AdResponseDto, UserResponseDto} from '@/entities/const'
import {formatActiveCategories} from '@/features/loanByLocation/helper'
import {formatting_phone_number} from '@/shared/helper'
import {useAdSearchInfiniteQuery, useFetch, useInfiniteScroll} from "@/shared/hooks";
import {get_company_banner} from "@/shared/api";
import {Banner} from "@/components/molecules";
import {useInfiniteQuery} from '@tanstack/react-query'
import {useEffect, useState} from "react";
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
    error,
    refetch,
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
              v.loan_available_location.join(', ') :
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
          <CompanyCardGrid>
            {data && data.map((v, i) => (
              <Banner
                key={i}
                {...v}
              />
            ))}
          </CompanyCardGrid>
          <div ref={setTarget} style={{width: '100%'}}>
            {isFetchingNextPage && <Player src={load} autoplay loop style={{height: 24}} />}
          </div>
        </>
      )}
    </Section>
  );
}


