import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {getLendersLendersGet} from '@/entities/api/default/default'
import {LenderDTO} from '@/entities/const'
import dynamic from 'next/dynamic'
import style from './style.module.scss'
import {useEffect, useState} from "react";
import {SwiperPaginationAndNavigation} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";
import Certified_company_card from "@/features/loan_certified/ui/Certified_company_card";
import Certified_company_modal from "@/features/loan_certified/ui/Certified_company_modal";
import {ICertified_company} from "@/shared/type";
import load from '@/public/assets/load_dot_120.json';
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Companies_section({
  search
}: {
  search: string
}) {
  const [is_open_modal, set_is_open_modal] = useState<boolean>(false);
  const [modal_data, set_modal_data] = useState<ICertified_company | null>(null)

  const [data, setData] = useState<Record<string, {
    data: Array<Array<ICertified_company>>
    maxPage: number
    maxCompany: number | null
  }>>({})

  const [page, setPage] = useState<number>(1)

  const [loadingPages, setLoadingPages] = useState<Set<string>>(new Set())

  const getKey = (search: string, page: number) => `${search}:${page}`

  const fetching = async (search: string, page: number) => {
    const key = getKey(search, page)
    if (loadingPages.has(key)) return

    setLoadingPages(prev => new Set(prev).add(key))

    try {
      const { pagination, data: rawData } = await getLendersLendersGet({ query: search, page })

      setData(prev => {
        const prevEntry = prev[search] ?? {
          data: [],
          maxPage: 0,
          maxCompany: null,
        }

        const newData = [...prevEntry.data]
        newData[page - 1] = rawData.map(v => parseLenderDtoToCertificatedCompay(v))

        return {
          ...prev,
          [search]: {
            data: newData,
            maxPage: pagination.total_pages,
            maxCompany: pagination.total_records
          }
        }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingPages(prev => {
        const newSet = new Set(prev)
        newSet.delete(key)
        return newSet
      })
    }
  }

  useEffect(() => {
    const start = Math.max(page - 2, 1)
    const end = Math.min(page + 2, data[search]?.maxPage ?? 5)
    for(let i = start; i <= end; i++) {
      if(data[search]?.data.length >= i) continue
      fetching(search, i)
    }
  }, [page, search])

  return (
    <Section>
      <Col gap={24} width={'fill'} className={style.swiper_button}>
        {data[search] && data[search]?.maxCompany ? (
          <Row>
            <Typo.Body emphasize color={'variable'}>{`${data[search].maxCompany}개`}</Typo.Body>
            <Typo.Body color={'variable'}>의 업체</Typo.Body>
          </Row>
        ) : (
          <Typo.Body color={'dim'}>로딩중</Typo.Body>
        )}
        <SwiperPaginationAndNavigation
          activeSlides={page}
          setActiveSlides={setPage}
          maxSlideLength={data[search]?.maxPage ?? 5}
        >
          {data[search] && Object.entries(data[search].data).map(([_, array_v], i) => (
            <SwiperSlide key={i}>
              {array_v && array_v.length > 0 ? (
                <div className={style.grid}>
                  {array_v.map((v, j) => (
                    <Certified_company_card
                      key={`company_card-${j}`}
                      {...v}
                      onClick={async () => {
                        set_modal_data({
                          ...v,
                        })
                        set_is_open_modal(true)
                      }}
                    />
                  ))}
                </div>
              ):(
                <Col
                  width={'fill'}
                  style={{height: '30vh'}}
                  justifyContents={'center'}
                  alignItems={'center'}
                >
                  <Player
                    src={load}
                    loop
                    autoplay
                  />
                </Col>
              )}
            </SwiperSlide>
          ))}
        </SwiperPaginationAndNavigation>
        <Certified_company_modal
          is_open_modal={is_open_modal}
          set_is_open_modal={set_is_open_modal}
          data={modal_data}
        />
      </Col>
    </Section>
  )
}

// function parse_certified_company_summary_data
// (data: Array<ICertified_company>): Array<Array<ICertified_company>> {
//   const res: Array<Array<ICertified_company>> = []
//   let temp: Array<ICertified_company> = []
//   data.forEach(v => {
//     if(temp.length != 0 && temp.length % 25 === 0) {
//       res.push(temp)
//       temp = [v]
//     } else {
//       temp.push(v)
//     }
//   })
//   if(temp.length > 0) res.push(temp)
//
//   return res;
// }

function parseLenderDtoToCertificatedCompay
(v: LenderDTO): ICertified_company {
  return {
    id: v.id.toString(),
    registration_number: v.registration_number,
    company_name: v.name,
    company_location: v.address ?? '주소를 불러오지 못했어요',
    company_owner: v.ceo,
    advertising_phone: v.phone ?? '전화번호를 불러오지 못했어요',
    registrar: v.registrar,
    registration_period: v.valid_period,
  }
}