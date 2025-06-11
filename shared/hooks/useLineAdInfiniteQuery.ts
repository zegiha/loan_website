'use client'

import {adsPublicControllerFindLineAds} from '@/entities/api/advertisement-public/advertisement-public'
import type {AdsPublicControllerFindLineAdsParams, ScrollAdResponseDto} from '@/entities/const'
import {InfiniteData, useInfiniteQuery} from '@tanstack/react-query'
import {IInfiniteQueryRes as DefaultIInfiniteQueryRes} from '@/shared/constants'
import {useEffect, useState} from 'react'
import {commonControllerPaginatedCompany} from "@/entities/api/common/common";

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
  const [fetchQueue, setFetchQueue] = useState<number>(0)
  const [fetchedPage, setFetchedPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [fetchQueueFlag, setFetchQueueFlag] = useState<boolean>(false)

  const [adsTotalPage, setAdsTotalPage] = useState<number>(1)
  const [commonTotalPage, setCommonTotalPage] = useState<number>(1)

  const queryRes = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({pageParam}) => {
      if(adType === 'main') {
        const isCommon = pageParam > adsTotalPage
        const data = !isCommon ? (
          await adsPublicControllerFindLineAds(
            adType,
            `${limit}`,
            `${pageParam}`,
            {
              ...option,
              search: option?.search ?? '',
            }
          )
        ):(
          await commonControllerPaginatedCompany(pageParam-adsTotalPage, limit)
        )

        if(!isCommon) setAdsTotalPage(data.totalPage)
        else setCommonTotalPage(data.totalPage)

        const newMaxPage = !isCommon ? data.totalPage + 1 : adsTotalPage + data.totalPage

        setMaxPage(newMaxPage)
        setFetchedPage(pageParam)

        const res: IInfiniteQueryRes = {
          currentPage: pageParam,
          totalPage: newMaxPage,
          data: [...data.scroll_ads]
        }

        return res
      } else {
        const data = await adsPublicControllerFindLineAds(
          adType,
          `${limit}`,
          `${pageParam}`,
          {
            ...option,
            search: option?.search ?? '',
          }
        )

        setMaxPage(data.totalPage)

        setFetchedPage(pageParam)

        const res: IInfiniteQueryRes = {
          currentPage: pageParam,
          totalPage: data.totalPage,
          data: [...data.scroll_ads]
        }

        return res
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if(lastPage.currentPage === lastPage.totalPage)
        return undefined
      return lastPage.currentPage + 1
    },
    select
  })

  const initStates = () => {
    setAdsTotalPage(1)

    setMaxPage(1)
    setFetchedPage(1)
    if(!queryRes.isFetchingNextPage)
      setFetchQueue(0)
    else
      setFetchQueueFlag(true)
  }

  useEffect(() => {
    if(
      !queryRes.isFetchingNextPage &&
      queryRes.hasNextPage &&
      fetchQueue > 0
    ) {
      queryRes.fetchNextPage()
        .then(() => {
          if(!fetchQueueFlag)
            setFetchQueue(p => p-1)
          else {
            setFetchQueueFlag(false)
            initStates()
          }
        })
    }
  }, [fetchQueue])

  return {
    ...queryRes,
    maxPage, setMaxPage,
    fetchedPage, setFetchedPage,
    setFetchQueue,
    initStates
  }
}
