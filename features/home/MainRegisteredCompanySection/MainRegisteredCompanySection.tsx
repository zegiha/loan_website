'use server'

import getRegisteredCompanyWithImage from "@/shared/api/getRegisteredCompanyWithImage";
import {CompanyCardGrid} from "@/components/organisms";
import {CompanyCard} from "@/components/molecules";
import Section from "@/components/molecules/section/Section";

export default async function MainRegisteredCompanySection() {
  return (
    <Section backgroundColor={'surfaceDim'}>
      <CompanyCardGrid>
        {getRegisteredCompanyWithImage(12).map((v, i) => (
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


