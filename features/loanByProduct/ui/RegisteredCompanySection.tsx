import {Banner, Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic_object} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {CompanyCardGrid, DataProvider} from "@/components/organisms";
import {formatting_phone_number} from '@/shared/helper'
import {useAdSearchInfiniteQuery, useInfiniteScroll} from '@/shared/hooks'
import {ICompany_banner_data} from '@/shared/type'
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json'
import {Row} from "@/components/atoms/layout";
import {useEffect} from 'react'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function RegisteredCompanySection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const {
    data,
    status,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAdSearchInfiniteQuery({
    queryKey: 'productionBanner',
    adType: '상품 배너 광고',
    limit: 20,
    option: {
      product: !activeCategories.has('전체') ?
        Array.from(activeCategories).join(',') :
        undefined
    },
    select: v => {
      const res: Array<ICompany_banner_data> = []

      v.pages.forEach(v => {
        v.data.map(v => {
          res.push({
            id: v.company_id,
            title: v.title ?? '',
            subtitle: v.sub_title ?? '',
            name: v.user.companyName,
            phone: formatting_phone_number(v.user.advertisementTel),
            location: v.loan_available_location?.slice(0, 2).join(', ') ?? '전체',
            img_url: v.image_url ?? v.cover_img,
          })
        })
      })

      return res
    }
  })

  const {setTarget} = useInfiniteScroll(
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  )

  useEffect(() => {
    refetch()
  }, [activeCategories])

  return (
    <Section>
      <Typo.Body emphasize color={'variable'}>
          <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
            {formatActiveCategories(activeCategories)}
          </span>
        등록업체
      </Typo.Body>
      {status === 'success' && (
        <DataProvider
          available={{
            isAvailable: data && data.length > 0,
            notAvailableContents: '아직 등록된 배너가 없어요'
          }}
        >
          <CompanyCardGrid>
            {data && (
              data.map((v, i) => (
                <Banner
                  key={i}
                  {...v}
                />
              ))
            )}
          </CompanyCardGrid>
          <div ref={setTarget} style={{width: '100%'}}>
            {isFetchingNextPage && <Player src={load} autoplay loop style={{height: 24}} />}
          </div>
        </DataProvider>
      )}
      {status === 'pending' && (
        <Row width={'fill'} justifyContents={'center'}>
          <Player src={load} autoplay loop style={{height: 24}}/>
        </Row>
      )}
    </Section>
  );
}
