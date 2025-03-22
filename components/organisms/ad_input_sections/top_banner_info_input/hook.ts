'use client'

import {useState} from "react";
import {ITop_banner_req} from "@/shared/type";
import {ITop_banner_info_input} from "@/components/organisms/ad_input_sections";

export default function use_top_banner_info(): ITop_banner_info_input {
	const [banner_info, set_banner_info] = useState<ITop_banner_req>({
		title: '',
		contents: '',
		banner_cover_img: null
	})
	return {
		banner_info, set_banner_info
	}
}