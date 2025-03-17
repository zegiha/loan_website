'use client'

import {createContext, useContext} from "react";
import {TAds_name} from "@/shared/type";

interface IInfo_validate_context {
	validate_list: Array<{name: TAds_name, status: boolean, error_message: string}>
	set_validate_list: React.Dispatch<React.SetStateAction<Array<{name: TAds_name, status: boolean, error_message: string}>>>;
}


export const Info_validate_context = createContext<IInfo_validate_context | null>(null)

export function use_info_validate_context() {
	const data = useContext(Info_validate_context)
	if(data === null) {
		throw new Error('use_info_validate_context is null')
	}
	return data
}