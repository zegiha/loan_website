import ICertified_company from "@/features/loan_certified/lib/ICertified_company";

export default function get_certified_company_by_id(id: string): ICertified_company {
  // TODO API
  return {
    id: 'temp',
    company_name: '청년금융지원대부중개',
    registration_number: '대전-4072',
    company_location: '대전광역시 서구 도산로 477-28, 르샹스쉐르빌 101호 (탄방동)',
    company_owner: '한종원',
    advertising_phone: '010-7625-9934',
    registrar: '대전 대전광역시 경제정책과과',
    registration_period: {
      start: new Date('2024-03-21'),
      end: new Date('2027-03-21'),
    }
  }
}
