import {StaticImageData} from "next/image";
import TAds_type from "@/shared/type/advertisement/TAds_type";
import {TAds_name} from "@/shared/type";

type TPrice_desc = {desc: string, price: string}
type TOption = {contents: string, type: 'selection' | 'number', price: number}
export interface IAd {
	type_name: TAds_type
	default_price: number
	name: TAds_name
	price_desc: Array<TPrice_desc>
	sub_price_desc: TPrice_desc | null
	desc: string
	sub_desc: string | null
	pc_preview_img: Array<StaticImageData | string>
	mobile_preview_img: Array<StaticImageData | string>
	option?: Array<TOption>
	duration?: number
}

export type TStep = 'get' | 'buy' | 'end'