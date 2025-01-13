import ICertified_company_summary from "@/features/loan_certified/lib/ICertified_company_summary";

export default interface ICertified_company extends ICertified_company_summary {
  advertising_phone: string
  registrar: string
  registration_period: {
    start: Date
    end: Date
  }
}
