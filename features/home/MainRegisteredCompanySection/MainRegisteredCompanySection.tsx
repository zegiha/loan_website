'use server'

import getCompanyWithImage from "@/features/home/MainRegisteredCompanySection/api/getCompanyWithImage";
import {CompanyCardGrid} from "@/components/organisms";
import {CompanyCard, Section} from "@/components/molecules";

export default async function MainRegisteredCompanySection() {
  return (
    <Section backgroundColor={'surfaceDim'}>
      <CompanyCardGrid>
        {getCompanyWithImage(12).map((v, i) => (
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


