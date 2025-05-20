import {AdResponseDto, ScrollAdResponseDto} from '@/entities/const'
import {useState} from "react";
import {ILine_req} from "@/shared/type";

export default function use_line_info(
	defaultValue?: ScrollAdResponseDto
) {
	const [banner_info, set_banner_info] = useState<ILine_req>({
		title: defaultValue?.title ?? '',
		loan_limit: defaultValue?.loan_limit?.toLocaleString('ko-KR') ?? '',
	})
	return {
		banner_info, set_banner_info,
	}
}
