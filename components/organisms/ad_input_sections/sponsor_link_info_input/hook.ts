'use client'

import {useState} from "react";
import {ISponsor_link_req} from "@/shared/type";
import {AdResponseDto} from "@/entities/const";

export default function use_sponsor_link_info(
  defaultValue?: AdResponseDto
) {
	const [banner_info, set_banner_info] = useState<ISponsor_link_req>({
		contents: defaultValue?.contents ?? '',
	})
	return {
		banner_info, set_banner_info,
	}
}
