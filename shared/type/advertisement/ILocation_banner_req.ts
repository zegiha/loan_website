import {TLocation} from "@/shared/type";

export default interface ILocation_banner_req {
	title: string
	subtitle: string
	phone: string
	location: Array<TLocation> | null
	banner_cover_img: File | null
	// company_name: string;
}