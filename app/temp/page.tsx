'use client'

import {Col} from "@/components/atoms/layout";
import Select from "@/components/molecules/inputs/select/Select";
import {useState} from "react";
import Quickbar_layout from "@/components/organisms/layout/Quickbar_layout";

export default function page() {
	const [selected_idx, set_selected_idx] = useState<number | null>(null);
	return (
		<Quickbar_layout>
			<Col width={400}>
				<Select
					placeholder={'placeholder'}
					option={['one', 'two', 'three']}
					selected_idx={selected_idx}
					set_selected_idx={set_selected_idx}
					max_option_item_show={1}
				/>
			</Col>
		</Quickbar_layout>
	)
}