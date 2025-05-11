import {TLocation} from "@/shared/type";

export default interface IBanner_req {
	title: string
	subtitle: string
	phone: string
	banner_cover_img?: File
	loan_available_location?: TLocation
	// company_name: string;
}