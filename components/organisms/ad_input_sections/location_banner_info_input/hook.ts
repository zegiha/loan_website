'use client'

import {useEffect, useState} from "react";
import {ILocation_banner_req} from "@/shared/type";
import {ILocation_banner_info_input} from "@/components/organisms/ad_input_sections";
import {AdResponseDto} from "@/entities/const";
import {formatting_phone_number} from "@/shared/helper";
import {location_list} from "@/shared/constants";

export default function use_location_banner_info(
  defaultValue?: AdResponseDto
): ILocation_banner_info_input {
	const [banner_info, set_banner_info] = useState<ILocation_banner_req>({
		title: defaultValue?.title ?? '',
		subtitle: defaultValue?.sub_title ?? '',
		phone: defaultValue?.user.advertisementTel ?
      formatting_phone_number(defaultValue?.user.advertisementTel) : '',
		banner_cover_img: undefined,
		location: defaultValue?.loan_available_location,
    loan_limit: defaultValue?.loan_limit?.toLocaleString('ko-KR') ?? ''
	})
	const [available_locations, set_available_locations] = useState<Array<number>>(defaultValue?.loan_available_location ?
    defaultValue.loan_available_location.map(v => location_list.findIndex(fv => fv === v)):
    []
  )
	const [check_available_locations, set_check_available_locations] = useState<Set<number>>(new Set())
	const [selected_option_idx, set_selected_option_idx] = useState<Array<number>>(defaultValue?.loan_available_location ?
    [Math.min(defaultValue.loan_available_location.length-1, 3)]:
    [0]
  )
	const [location_num, set_location_num] = useState<number>(defaultValue?.loan_available_location ?
    defaultValue.loan_available_location.length:
    1
  )
	const [location_num_string, set_location_num_string] = useState<string>(defaultValue?.loan_available_location ?
    `${Math.max(defaultValue.loan_available_location.length, 4)}`:
    '4'
  )

	useEffect(() => {
		// set_available_locations(Array.from({length: location_num}).map(() => null))
		set_check_available_locations(new Set())
	}, [location_num])

	return {
		banner_info, set_banner_info,
		available_locations, set_available_locations,
		check_available_locations, set_check_available_locations,
		selected_option_idx, set_selected_option_idx,
		location_num, set_location_num,
		location_num_string, set_location_num_string,
    prevImg: defaultValue?.image_url ?? defaultValue?.cover_img
	}
}
