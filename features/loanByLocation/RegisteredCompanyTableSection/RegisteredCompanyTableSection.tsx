'use client';

import {useEffect, useRef, useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import {CloseIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {Section, AccordionSectionTitle} from "@/components/molecules";
import {BaseTextInput} from "@/components/molecules/inputs";
import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {ICompany_row, ICompany_row_having_is_visible_company_name, TLocation} from "@/shared/type";
import {semantic_object} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {SwiperSlide} from "swiper/react";
import {
  RegisteredCompanyTableHead,
  RegisteredCompanyTableRow
} from "@/features/loanByLocation/ui/RegisteredCompanyTable";
import {useLineAdInfiniteQuery, useSearch} from "@/shared/hooks";

const contentsNumberData = ['5', '10', '15', '20']

export default function RegisteredCompanyTableSection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('5')
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)

  const formatRegisteredCompany = (rawData: Array<ICompany_row>): Array<Array<ICompany_row_having_is_visible_company_name>> => {
    const data: Array<ICompany_row_having_is_visible_company_name> = [];
    rawData.forEach((item) => {data.push({...item, is_visible_company_name: visible_company_name})})
    const res: Array<Array<ICompany_row_having_is_visible_company_name>> = [];
    for(let i = 0; i < rawData.length; i++) {
      if(i % Number(activeContentsNumber) === 0) res.push([]);
      res[res.length-1].push(data[i]);
    }
    return res;
  }

  const {
    prevSearch, setPrevSearch,
    search
  } = useSearch()

  const [fetchQueue, setFetchQueue] = useState<number>(0)

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useLineAdInfiniteQuery({
    queryKey: 'locationLine',
    adType: 'location',
    limit: Number(activeContentsNumber),
    option: {
      location: Array.from(activeCategories).length > 0 ?
        Array.from(activeCategories).join(','):
        '전체',
      search: search,
    },
    select: v => {
      const res: Array<ICompany_row> = []
      v.pages.forEach(v => {
        v.data.forEach(v => {
          res.push({
            id: v.company_id,
            location: v.loan_available_location !== undefined && v.loan_available_location.length > 0 ?
              v.loan_available_location.join(', '):
              '전체',
            loan_limit: v.loan_limit.toLocaleString('ko-KR'),
            title: v.title ?? '',
            name: v.company_name,
          })
        })
      })
      return res
    }
  })

  useEffect(() => {
    if(hasNextPage && fetchQueue > 0) {
      if(!isFetchingNextPage)
        fetchNextPage()
          .then(() => {
            setFetchQueue(p => p-1)
          })
    }
  }, [fetchQueue])

  useEffect(() => {
    setPage(1)
    setMaxPage(1)
    setFetchQueue(0)
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
        <SwiperPaginationAndNavigation
          activeSlides={page}
          setActiveSlides={setPage}
          onSlideChangeCallback={swiper => {
            if(swiper.activeIndex + 1 >= maxPage)
              setFetchQueue(swiper.activeIndex + 1 - maxPage)
          }}
        >
          {data && formatRegisteredCompany(data).map((v, i) => (
            <SwiperSlide key={`${i}-slide`}>
              <Table
                head={<RegisteredCompanyTableHead visible_company_name={visible_company_name}/>}
              >
                {v.map((contents, index) => (
                  <RegisteredCompanyTableRow
                    key={`${index}-tableItem`}
                    {...contents}
                  />
                ))}
              </Table>
            </SwiperSlide>
          ))}
        </SwiperPaginationAndNavigation>
      </Col>
    </Section>
  )
}
