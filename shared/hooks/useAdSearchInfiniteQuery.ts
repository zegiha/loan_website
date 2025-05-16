'use client'

import {adsPublicControllerSearchAds} from '@/entities/api/advertisement-public/advertisement-public'
import {AdResponseDto, AdsPublicControllerSearchAdsParams} from '@/entities/const'
import {IInfiniteQueryRes as DefaultIInfiniteQueryRes} from '@/shared/constants'
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query'

type IInfiniteQueryRes = DefaultIInfiniteQueryRes<Omit<AdResponseDto, 'totalPage'>>

export default function useAdSearchInfiniteQuery<S>({
  queryKey,
  adType,
  limit,
  select,
}:{
  queryKey: string,
  adType: string,
  limit: number,
  select?: (v: InfiniteData<IInfiniteQueryRes, number>) => S,
  option?: AdsPublicControllerSearchAdsParams,
}) {
  const queryRes = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({pageParam}) => {
      const data = await adsPublicControllerSearchAds(
        adType,
        `${pageParam}`,
        `${limit}`,
      )

      const res: IInfiniteQueryRes = {
        currentPage: pageParam,
        totalPage: data.totalPage,
        data: [...data.ads],
      }

      return res
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if(lastPage.currentPage === lastPage.totalPage)
        return undefined
      return lastPage.currentPage + 1
    },
    select,
  })

  return {
    ...queryRes
  }
}