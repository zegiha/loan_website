'use server'

import ICertified_company_summary from "@/shared/type/company/ICertified_company_summary";

export default async function get_certified_companies_summary(search: string): Promise<Array<ICertified_company_summary>> {
  // TODO API
  const dummy: ICertified_company_summary = {
    id: 'temp',
    company_name: '청년금융지원대부중개',
    registration_number: '대전-4072',
    company_location: '대전광역시 서구 도산로 477-28, 르샹스쉐르빌 101호 (탄방동)',
    company_owner: '한종원'
  }
  const res: Array<ICertified_company_summary> = [];
  for(let i = 0; i < 51; i++) res.push(dummy);
  return res;
}
