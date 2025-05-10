import {
	IBanner_req,
	ILine_req,
	ILocation_banner_req,
	IPremium_banner_req, IProduct_banner_req,
	ISponsor_link_req,
	ITop_banner_req
} from "@/shared/type";

type TAll_req =
	IBanner_req |
	ILine_req |
	IPremium_banner_req |
	ISponsor_link_req |
	ITop_banner_req |
	ILocation_banner_req |
	IProduct_banner_req

export default TAll_req;