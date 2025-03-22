'use client'

import {useState} from "react";
import {ISponsor_link_req} from "@/shared/type";

export default function use_sponsor_link_info() {
	const [banner_info, set_banner_info] = useState<ISponsor_link_req>({
		contents: '',
	})
	return {
		banner_info, set_banner_info,
	}
}