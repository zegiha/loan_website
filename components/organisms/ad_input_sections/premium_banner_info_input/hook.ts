'use client'

import {IPremium_banner_info_input} from "@/components/organisms/ad_input_sections";
import {useState} from "react";
import {IPremium_banner_req} from "@/shared/type";

export default function use_premium_banner_info(): IPremium_banner_info_input {
	const [banner_info, set_banner_info] = useState<IPremium_banner_req>({
		title: '',
		location: undefined,
	})
	const [selected_available_location_idx, set_selected_available_location_idx] = useState<number | null>(null)

	return {
		banner_info, set_banner_info,
		selected_available_location_idx, set_selected_available_location_idx
	}
}