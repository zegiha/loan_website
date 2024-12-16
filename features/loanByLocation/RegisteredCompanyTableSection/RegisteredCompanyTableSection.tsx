'use client';

import {useEffect, useRef, useState} from "react";
import {Col, Row} from "@/components/atoms/layout";
import {CloseIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {Section, AccordionSectionTitle} from "@/components/molecules";
import {BaseTextInput} from "@/components/molecules/inputs";
import {SwiperPaginationAndNavigation, Table} from "@/components/organisms";
import {TRegisterStatus} from "@/shared/type";
import getRegisterCompany from "@/shared/api/getRegisterCompany";
import {semantic} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {SwiperSlide} from "swiper/react";
import {
  RegisteredCompanyTableHead,
  RegisteredCompanyTableRow
} from "@/features/loanByLocation/ui/RegisteredCompanyTable";

const contentsNumberData = ['5', '10', '15', '20']

export default function RegisteredCompanyTableSection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('5')

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

  useEffect(() => {
    setRegisteredCompanyData([...formatRegisteredCompany(getRegisterCompany(60, Array.from(activeContentsNumber), true))])
  }, [activeContentsNumber]);


  const [visible_company_name, set_visible_company_name] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if(ref.current) {
      set_visible_company_name(ref.current.offsetWidth > 600);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
    <Section backgroundColor={'surface'} ref={ref}>
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
              onClick={() => setSearch('')}
            >
              <CloseIcon
                size={20}
                color={'dim'}
              />
            </div>}
            value={search}
            onChangeAction={(v) => setSearch(v)}
          />
        </Row>
        <SwiperPaginationAndNavigation>
          {registeredCompanyData.map((v, i) => (
            <SwiperSlide key={`${i}-slide`}>
              <Table
                head={<RegisteredCompanyTableHead visible_company_name={visible_company_name}/>}
              >
                {v.map((contents, index) => (
                  <RegisteredCompanyTableRow
                    key={`${index}-tableItem`}
                    name={contents.companyName}
                    loanLimit={contents.loanLimit ?? '상담 후 결정'}
                    location={contents.location}
                    title={contents.title}
                    visible_company_name={visible_company_name}
                  />
                ))}
              </Table>
            </SwiperSlide>
          ))}
        </SwiperPaginationAndNavigation>
      </Col>
    </Section>
  );
}
