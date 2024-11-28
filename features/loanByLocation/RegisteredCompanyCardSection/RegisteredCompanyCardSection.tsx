import {CompanyCard} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {useState} from "react";
import AccordionSectionTitle from "@/components/molecules/AccordionSectionTitle/AccordionSectionTitle";
import {CompanyCardGrid} from "@/components/organisms";
import getRegisteredCompanyWithImage from "@/shared/api/getRegisteredCompanyWithImage";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import Section from "@/components/molecules/section/Section";

const contentsNumberData = ['10', '20', '30', '60']

export default function RegisteredCompanyCardSection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('20');

  return (
    <Section>
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
      <CompanyCardGrid>
        {getRegisteredCompanyWithImage(Number(activeContentsNumber)).map((v, i) => (
          <CompanyCard
            key={i}
            type={'image'}
            {...v}
          />
        ))}
      </CompanyCardGrid>
    </Section>
  );
}
