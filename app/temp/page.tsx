'use client'

import {Col} from "@/components/atoms/layout";
import Select from "@/components/molecules/inputs/select/Select";
import {useState} from "react";

export default function page() {
	const [selected_idx, set_selected_idx] = useState<number | null>(null);
	return (
		<Col width={400}>
			<Select
				placeholder={'placeholder'}
				option={['one', 'two', 'three']}
				selected_idx={selected_idx}
				set_selected_idx={set_selected_idx}
				max_option_item_show={1}
			/>
		</Col>
	)
}