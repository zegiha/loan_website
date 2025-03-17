import ICertified_company_summary from "@/shared/type/company/ICertified_company_summary";

export default interface ICertified_company extends ICertified_company_summary {
  advertising_phone: string
  registrar: string
  registration_period: {
    start: Date
    end: Date
  }
}
