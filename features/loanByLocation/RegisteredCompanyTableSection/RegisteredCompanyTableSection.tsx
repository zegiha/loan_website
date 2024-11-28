import Section from "@/components/molecules/section/Section";
import {useEffect, useRef, useState} from "react";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import AccordionSectionTitle from "@/components/molecules/AccordionSectionTitle/AccordionSectionTitle";
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperType} from 'swiper';
import {TableHead, TableRow} from "@/components/molecules";
import getRegisterCompany from "@/shared/api/getRegisterCompany";
import {Table} from "@/components/organisms";
import {TRegisterStatus} from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/type";
import {BaseButton, BaseTextInput, iconButton} from "@/components/molecules/inputs";
import {Col, Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import {eventSwcPlugins} from "next/dist/telemetry/events/swc-plugins";
import {subscribeWithSelector} from "zustand/middleware/subscribeWithSelector";
import CloseIcon from "@/components/atoms/icons/CloseIcon";

const contentsNumberData = ['5', '10', '15', '20']

export default function RegisteredCompanyTableSection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('5')

  const swiperRef = useRef<SwiperType>();

  const formatRegisteredCompany = (rawData: Array<TRegisterStatus>): Array<Array<TRegisterStatus>> => {
    const res: Array<Array<TRegisterStatus>> = [];
    for(let i = 0; i < rawData.length; i++) {
      if(i % Number(activeContentsNumber) === 0) res.push([]);
      res[res.length-1].push(rawData[i]);
    }
    return res;
  }
  const [registeredCompanyData, setRegisteredCompanyData] = useState(formatRegisteredCompany(getRegisterCompany(60, Array.from(activeCategories), true)));

  const [search, setSearch] = useState<string>('');

  const [activeSlides, setActiveSlides] = useState(1);
  const [pagenation, setPagenation] = useState<Array<number>>([]);

  const handlePagenationRender = () => {
    if(swiperRef.current) {
      const slideLength = swiperRef.current.slides.length;
      const newPagenation: Array<number> = []
      if(slideLength <= 5) {
        for(let i = 1; i <= slideLength; i++)
          newPagenation.push(i);
      } else {
        const start = activeSlides - 2;
        const end = activeSlides + 2;
        if(start <= 1) {
          for(let i = 0; i < 5; i++)
            newPagenation.push(i + 1);
        } else {
          if(end >= slideLength) {
            for(let i = slideLength - 4; i <= slideLength; i++)
              newPagenation.push(i);
          } else {
            for(let i = end - 4; i <= end; i++)
              newPagenation.push(i);
          }
        }

      }
      setPagenation(newPagenation)
    }
  }

  const handleNextSlide = () => {
    if(swiperRef.current) {
      if(swiperRef.current.allowSlideNext) {
        swiperRef.current.slideNext(240);
        setActiveSlides(swiperRef.current.activeIndex + 1);
      }
    }
  }
  const handlePrevSlide = () => {
    if (swiperRef.current) {
      if (swiperRef.current.allowSlidePrev) {
        swiperRef.current.slidePrev(240);
        setActiveSlides(swiperRef.current.activeIndex + 1);
      }
    }
  }

  useEffect(() => {
    setRegisteredCompanyData([...formatRegisteredCompany(getRegisterCompany(60, Array.from(activeContentsNumber), true))])
  }, [activeContentsNumber]);

  useEffect(() => {
    handlePagenationRender()
  }, [activeSlides]);

  return (
    <Section backgroundColor={'surface'}>
      <AccordionSectionTitle
        title={
          <Typo.Body emphasize color={'variable'}>
          <span className={semantic.onGenericOnGenericPrimary}>
            {formatActiveCategories(activeCategories)}
          </span>
            등록업체
          </Typo.Body>
        }
        accordionData={contentsNumberData}
        activeAccordion={activeContentsNumber}
        measurement={'개'}
        onAccordionActiveChange={(newContentsNumber) => setActiveContentsNumber(newContentsNumber)}
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
              onClick={() => setSearch('')}
            >
              <CloseIcon
                size={20}
                color={'dim'}
              />
            </div>}
            value={search}
            onChangeAction={(e) => setSearch(e.target.value)}
          />
        </Row>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onUpdate={(swiper) => {
            swiperRef.current = swiper
            handlePagenationRender()
            setActiveSlides(1)
          }}
          spaceBetween={40}
          style={{
            paddingLeft: 1,
          }}
        >
          {registeredCompanyData.map((v, i) => (
            <SwiperSlide key={i}>
              <Table head={<RegisteredCompanyTableHead/>}>
                {v.map((contents, i) => (
                  <RegisteredCompanyTableRow
                    key={i}
                    name={contents.companyName}
                    loanLimit={contents.loanLimit ?? '상담 후 결정'}
                    location={contents.location}
                    title={contents.title}
                  />
                ))}
              </Table>
            </SwiperSlide>
          ))}
        </Swiper>
        <Row gap={8} width={'fill'} justifyContents={'center'}>
          <BaseButton
            className={`${iconButton.iconButton28}`}
            onClick={() => handlePrevSlide()}
          >
            <ArrowIcon
              size={20}
              color={'dim'}
              deg={180}
            />
          </BaseButton>
          {pagenation.map((v, i) => (
            <BaseButton
              key={i}
              className={`${v === activeSlides ? iconButton.iconButton28Active : iconButton.iconButton28}`}
              onClick={() => {
                swiperRef.current?.slideTo(v-1, 240)
                setActiveSlides(v);
              }}
            >
              <Typo.Contents color={activeSlides === v ? 'generic' : 'dim'}>
                {v}
              </Typo.Contents>
            </BaseButton>
          ))}
          <BaseButton
            className={`${iconButton.iconButton28}`}
            onClick={() => handleNextSlide()}
          >
            <ArrowIcon
              size={20}
              color={'dim'}
            />
          </BaseButton>
        </Row>
      </Col>
    </Section>
  );
}





function RegisteredCompanyTableHead() {
  return <TableHead>
    <Typo.Contents width={60}>
      지역
    </Typo.Contents>
    <Typo.Contents width={80}>
      대출한도
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      제목
    </Typo.Contents>
    <Typo.Contents width={100}>
      업체명
    </Typo.Contents>
  </TableHead>
}

function RegisteredCompanyTableRow({
  location,
  loanLimit,
  title,
  name
}: {
  location: string,
  loanLimit: string,
  title: string,
  name: string,
}) {
  return <TableRow>
    <Typo.Contents width={60}>
      {location}
    </Typo.Contents>
    <Typo.Contents width={80}>
      {loanLimit}
    </Typo.Contents>
    <Typo.Contents width={'fill'} textOverflowLine={1}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={100} textOverflowLine={1}>
      {name}
    </Typo.Contents>
  </TableRow>
}
