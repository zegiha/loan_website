'use client'

import {useState} from "react";
import {ITop_banner_req} from "@/shared/type";
import {ITop_banner_info_input} from "@/components/organisms/ad_input_sections";
import {AdResponseDto} from "@/entities/const";

export default function use_top_banner_info(
  defaultValue?: AdResponseDto
): ITop_banner_info_input {
	const [banner_info, set_banner_info] = useState<ITop_banner_req>({
		title: defaultValue?.title ?? '',
		contents: defaultValue?.contents ?? '',
		banner_cover_img: undefined,
    loan_limit: defaultValue?.loan_limit?.toLocaleString('ko-KR') ?? '',
	})
	return {
		banner_info, set_banner_info,

    prevImg: defaultValue?.image_url ?? defaultValue?.cover_img
	}
}
