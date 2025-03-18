import {Banner} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic_object} from "@/shared/color";
import {useState} from "react";
import AccordionSectionTitle from "@/components/molecules/AccordionSectionTitle/AccordionSectionTitle";
import {CompanyCardGrid} from "@/components/organisms";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import Section from "@/components/molecules/Layout/section/Section";
import {useFetch} from "@/shared/hooks";
import {get_company_banner} from "@/shared/api";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json'
import {Row} from "@/components/atoms/layout";

const contentsNumberData = ['10', '20', '30', '60']

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function RegisteredCompanyCardSection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('20');
  const {data, is_loading} = useFetch(() => get_company_banner('location'))

  return (
    <Section>
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
      {is_loading ? (
        <Row width={'fill'} justifyContents={'center'}>
          <Player src={load} autoplay loop style={{height: 24}}/>
        </Row>
      ) : (
        <CompanyCardGrid>
          {data !== null && (
            data.map((v, i) => (
              <Banner
                key={i}
                {...v}
              />
            ))
          )}
        </CompanyCardGrid>
      )}
    </Section>
  );
}
