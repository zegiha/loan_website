'use client';

import {useEffect, useRef, useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import {CloseIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {Section, AccordionSectionTitle} from "@/components/molecules";
import {BaseTextInput} from "@/components/molecules/inputs";
import {DataProvider, SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {ICompany_row, ICompany_row_having_is_visible_company_name} from "@/shared/type";
import {semantic_object} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {SwiperSlide} from "swiper/react";
import {
  RegisteredCompanyTableHead,
  RegisteredCompanyTableRow, RegisteredCompanyTableRowSkeleton
} from "@/features/loanByLocation/ui/RegisteredCompanyTable";
import {useLineAdInfiniteQuery, useSearch} from "@/shared/hooks";

const contentsNumberData = ['5', '10', '15', '20']

export default function RegisteredCompanyTableSection({
                                                        activeCategories
                                                      }: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('5')

  const [page, setPage] = useState(1)

  const {
    prevSearch, setPrevSearch,
    search
  } = useSearch()

  const {
    data,
    refetch,
    initStates,
    maxPage,
    fetchedPage,
    setFetchQueue,
  } = useLineAdInfiniteQuery({
    queryKey: 'productBanner',
    adType: 'product',
    limit: Number(activeContentsNumber),
    option: {
      search,
      product: Array.from(activeCategories).length > 0 ?
        Array.from(activeCategories).join(','):
        '전체',
    },
    select: v => {
      const res: Array<Array<ICompany_row> | null> = []
      v.pages.forEach(v => {
        res.push([...v.data.map(v => ({
          id: v.company_id,
          location: v.loan_available_location !== undefined && v.loan_available_location.length > 0 ?
            v.loan_available_location.join(', '):
            '전체',
          loan_limit: v.loan_limit.toLocaleString('ko-KR'),
          title: v.title ?? '',
          name: v.company_name,
        }))])
      })
      for(let i = v.pages.length + 1; i <= v.pages[0].totalPage; i++)
        res.push(null)
      return [...res]
    }
  })

  useEffect(() => {
    initStates()
    setPage(1)
    refetch()
  }, [search, activeCategories, activeContentsNumber]);

  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_visible_company_name(ref.current.offsetWidth > 600);
    }
  }

  useEffect(() => {
    if(data) {
      handleResize();
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [data]);

  return (
    <Section backgroundColor={'surface'} ref={ref}>
      <AccordionSectionTitle
        title={
          <Typo.Body emphasize color={'variable'}>
          <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
            {formatActiveCategories(activeCategories)}
          </span>
            등록업체
          </Typo.Body>
        }
        accordionData={contentsNumberData}
        activeAccordion={activeContentsNumber}
        measurement={'개'}
        onAccordionActiveChangeAction={(newContentsNumber) => setActiveContentsNumber(newContentsNumber)}
        lastComment={'( 최대 )'}
      />
      <Col gap={12} width={'fill'}>
        <Row width={'fill'} justifyContents={'end'}>
          <BaseTextInput
            size={'normal'}
            width={'fill'}
            maxWidth={280}
            placeholder={'검색어를 입력해주세요'}
            TypingIcon={<div
              style={{width: 20, height: 20}}
              onClick={() => setPrevSearch('')}
            >
              <CloseIcon
                size={20}
                color={'dim'}
              />
            </div>}
            value={prevSearch}
            onChangeAction={(v) => setPrevSearch(v)}
          />
        </Row>
        <DataProvider
          available={{
            isAvailable: data && !!data[0] && data[0]?.length > 0,
            notAvailableContents: '아직 등록된 업체가 없어요'
          }}
        >
          <SwiperPaginationAndNavigation
            activeSlides={page}
            setActiveSlides={setPage}
            maxSlideLength={maxPage}
            onSlideChangeCallback={swiper => {
              if(swiper.activeIndex + 1 > fetchedPage)
                setFetchQueue(p => p + swiper.activeIndex + 1 - fetchedPage)
            }}
          >
            {data && data.map((v, i) => (
              <SwiperSlide key={i}>
                <Table
                  head={<RegisteredCompanyTableHead visible_company_name={visible_company_name}/>}
                >
                  {v ? (
                    v.map((v, i) => (
                      <RegisteredCompanyTableRow
                        key={`${i}-tableItem`}
                        {...v}
                        is_visible_company_name={visible_company_name}
                      />
                    ))
                  ):(
                    Array.from({length: Number(activeContentsNumber)}).map((_, i) => (
                      <RegisteredCompanyTableRowSkeleton
                        key={i}
                        is_visible_company_name={visible_company_name}
                      />
                    ))
                  )}
                </Table>
              </SwiperSlide>
            ))}
          </SwiperPaginationAndNavigation>
        </DataProvider>
      </Col>
    </Section>
  )
}
