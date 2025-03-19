import TLoan_production_type from "@/shared/type/TLoan_production_type";
import {TLocation} from "@/shared/type";

export default interface IProduct_banner_req {
	title: string
	subtitle: string
	phone: string
	product: Array<TLoan_production_type> | null
	banner_cover_img: File | null
	loan_available_location: TLocation | null
	// company_name: string;
}