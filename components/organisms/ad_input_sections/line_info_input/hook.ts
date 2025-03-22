import {useState} from "react";
import {ILine_req} from "@/shared/type";

export default function use_line_info() {
	const [banner_info, set_banner_info] = useState<ILine_req>({
		title: '',
		loan_limit: '',
	})
	return {
		banner_info, set_banner_info,
	}
}