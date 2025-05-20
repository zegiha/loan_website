'use client'

import {adsPublicControllerSearchAds} from '@/entities/api/advertisement-public/advertisement-public'
import {AdResponseDto, AdsPublicControllerSearchAdsParams} from '@/entities/const'
import {IInfiniteQueryRes as DefaultIInfiniteQueryRes} from '@/shared/constants'
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query'
import {AxiosError} from 'axios'

type IInfiniteQueryRes = DefaultIInfiniteQueryRes<Omit<AdResponseDto, 'totalPage'>>

export default function useAdSearchInfiniteQuery<S>({
  queryKey,
  adType,
  limit,
  select,
  option,
}:{
  queryKey: string | Array<string>,
  adType: string,
  limit: number,
  select?: (v: InfiniteData<IInfiniteQueryRes, number>) => S,
  option?: AdsPublicControllerSearchAdsParams,
}) {
  const queryRes = useInfiniteQuery({
    queryKey: typeof queryKey === 'string' ? [queryKey] : [...queryKey],
    queryFn: async ({pageParam}) => {
      const data = await adsPublicControllerSearchAds(
        adType,
        `${pageParam}`,
        `${limit}`,
        option,
      )

      if(data.ads.length === 0 && data.totalPage === 0) {
        return {
          currentPage: 0,
          totalPage: 0,
          data: []
        }
      }

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
