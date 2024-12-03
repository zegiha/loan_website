import {CompanyCardGrid, DetailsContentsSection} from "@/components/organisms";
import getRegisterCompany from "@/shared/api/getRegisterCompany";
import {CompanyCard} from "@/components/molecules";

export default function ConsultationAvailableCompaniesSection() {
  return <DetailsContentsSection subTitle={'상담 가능 업체'}>
    <CompanyCardGrid>
      {getRegisterCompany(10).map((v, i) => (
        <CompanyCard
          key={i}
          type={'text'}
          title={v.title}
          location={v.location}
          name={v.companyName}
          phone={'010-0000-0000'}
        />
      ))}
    </CompanyCardGrid>
  </DetailsContentsSection>;
}
