import location_list from "@/shared/constants/location_list";
import loan_production_list from "@/shared/constants/loan_production_list";
import IInfiniteQueryRes from '@/shared/constants/IInfiniteQueryRes'
import {
	typeByAdName,
	getReqKeys,
	adsNameToInterfaceMap,
	guard
} from '@/shared/constants/ad'

export {
	getReqKeys,
	guard,
	adsNameToInterfaceMap,
	location_list,
	loan_production_list,
}

export type {
	typeByAdName,
	IInfiniteQueryRes
}