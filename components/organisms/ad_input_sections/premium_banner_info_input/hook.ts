'use client'

import {IPremium_banner_info_input} from "@/components/organisms/ad_input_sections";
import {useEffect, useState} from "react";
import {IPremium_banner_req} from "@/shared/type";
import {AdResponseDto} from "@/entities/const";

export default function use_premium_banner_info(
  defaultValue?: AdResponseDto
): IPremium_banner_info_input {
	const [banner_info, set_banner_info] = useState<IPremium_banner_req>({
		title: defaultValue?.title ?? '',
    // TODO Array로 된 지역 대응
		location: undefined,
	})
	const [selected_available_location_idx, set_selected_available_location_idx] = useState<number | null>(null)

	useEffect(() => {
		console.log(banner_info)
	}, [])

	return {
		banner_info, set_banner_info,
		selected_available_location_idx, set_selected_available_location_idx,
	}
}
