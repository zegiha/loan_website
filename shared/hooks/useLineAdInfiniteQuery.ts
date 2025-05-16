'use client'

import {adsPublicControllerFindLineAds} from '@/entities/api/advertisement-public/advertisement-public'
import type {AdsPublicControllerFindLineAdsParams, ScrollAdResponseDto} from '@/entities/const'
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query'
import {IInfiniteQueryRes as DefaultIInfiniteQueryRes} from '@/shared/constants'

interface IUseLineAdInfiniteQuery<S> {
  queryKey: string
  adType: string
  limit: number
  option?: AdsPublicControllerFindLineAdsParams
  select?: (v: InfiniteData<IInfiniteQueryRes, number>) => S
}

type IInfiniteQueryRes = DefaultIInfiniteQueryRes<ScrollAdResponseDto>

export default function useLineAdInfiniteQuery<S>({
  queryKey,
  adType,
  limit,
  option,
  select,
}: IUseLineAdInfiniteQuery<S>) {
  const queryRes = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({pageParam}) => {
      const data = await adsPublicControllerFindLineAds(
        adType,
        `${limit}`,
        `${pageParam}`,
        {
          ...option,
          search: option?.search ?? '',
        }
      )

      const res: IInfiniteQueryRes = {
        currentPage: pageParam,
        totalPage: data.totalPage,
        data: [...data.scroll_ads]
      }

      return res
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if(lastPage.currentPage === lastPage.totalPage)
        return undefined
      return lastPage.currentPage + 1
    },
    select
  })

  return {
    ...queryRes
  }
}