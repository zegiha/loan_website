import {AccordionSectionTitle, CompanyCard, Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {useState} from "react";
import {CompanyCardGrid} from "@/components/organisms";
import getRegisteredCompanyWithImage from "@/shared/api/getRegisteredCompanyWithImage";

const contentsNumberData = ['10', '20', '30', '60']

export default function RegisteredCompanySection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const [activeContentsNumber, setActiveContentsNumber] = useState('20')
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
        lastComment={'( 최대 )'}
        onAccordionActiveChangeAction={(newContentsNumber) => setActiveContentsNumber(newContentsNumber)}
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
