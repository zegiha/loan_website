'use server'

import Section from "@/components/molecules/section/Section";
import CompanyCard from "@/components/molecules/companyCard/CompanyCard";
import style from './mainRegisteredCompanySection.module.scss'
import getCompanyWithImage from "@/features/home/MainRegisteredCompanySection/api/getCompanyWithImage";

export default async function MainRegisteredCompanySection() {
  return (
    <Section backgroundColor={'surfaceDim'}>
      <div className={style.companyCardGrid}>
        {getCompanyWithImage(12).map((v, i) => (
          <CompanyCard
            key={i}
            type={'image'}
            {...v}
          />
        ))}
      </div>
    </Section>
  );
}


