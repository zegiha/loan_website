import TLoan_production_type from "@/shared/type/TLoan_production_type";

export default interface IProduct_banner_req {
	title: string
	subtitle: string
	phone: string
	product: TLoan_production_type | null
	banner_cover_img: File | null
	// company_name: string;
}