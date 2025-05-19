'use client'

import {IPremium_banner_info_input} from "@/components/organisms/ad_input_sections";
import {useEffect, useState} from "react";
import {IPremium_banner_req} from "@/shared/type";
import {AdResponseDto} from "@/entities/const";
import {location_list} from "@/shared/constants";

export default function use_premium_banner_info(
  defaultValue?: AdResponseDto
): IPremium_banner_info_input {
	const [banner_info, set_banner_info] = useState<IPremium_banner_req>({
		title: defaultValue?.title ?? '',
    location: defaultValue?.loan_available_location
	})
  const [selected_available_location_idx, set_selected_available_location_idx] = useState<Array<number>>(defaultValue?.loan_available_location ?
    defaultValue.loan_available_location.map(v => location_list.findIndex(frontValue => frontValue === v)):
    []
  )

	return {
		banner_info, set_banner_info,
		selected_available_location_idx, set_selected_available_location_idx,
	}
}
