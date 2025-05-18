'use client'

import {useState} from "react";
import {IBanner_req} from "@/shared/type";
import {IMain_banner_info_input} from "@/components/organisms/ad_input_sections";
import {AdResponseDto, AdResponseDtoAdName} from "@/entities/const";
import defaultLoader from "next/dist/shared/lib/image-loader";

export default function use_main_banner_info(
  defaultValue?: AdResponseDto
): IMain_banner_info_input {
	const [banner_info, set_banner_info] = useState<IBanner_req>({
		title: defaultValue?.title ?? '',
		subtitle: defaultValue?.sub_title ?? '',
    // TODO Array로 오는 지역 대응
		loan_available_location: undefined,
		banner_cover_img: undefined,
    loan_limit: defaultValue?.loan_limit?.toLocaleString('ko-KR') ?? ''
	})
	const [selected_available_location_idx, set_selected_available_location_idx] = useState<number | null>(null)


	return {
		banner_info,
		set_banner_info,

		selected_available_location_idx,
		set_selected_available_location_idx,

    prevImg: defaultValue?.image_url ?? defaultValue?.cover_img
	}
}
