'use client'

import {useState} from "react";
import {IBanner_req} from "@/shared/type";
import {IMain_banner_info_input} from "@/components/organisms/ad_input_sections";

export default function use_main_banner_info(): IMain_banner_info_input {
	const [banner_info, set_banner_info] = useState<IBanner_req>({
		title: '',
		subtitle: '',
		phone: '',
		loan_available_location: undefined,
		banner_cover_img: undefined,
	})
	const [selected_available_location_idx, set_selected_available_location_idx] = useState<number | null>(null)


	return {
		banner_info,
		set_banner_info,

		selected_available_location_idx,
		set_selected_available_location_idx,
	}
}