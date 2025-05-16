import {TAds_name, TAds_type, TAll_req} from "@/shared/type";
import {useState} from "react";
import Editing from "@/features/my/ads/ui/edit_ad/Editing";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import ad_list from "@/shared/constants/ad_list";
import Edited from "@/features/my/ads/ui/edit_ad/Edited";

export default function Edit_ad({
	id,
}: {
	id: TAds_name
}) {
	const get_price = (name: TAds_name): number => {
		let price = 0
		ad_list.forEach((v) => {
			if(v.name === name) price = v.default_price
		})
		return price
	}

	const [step, set_step] = useState<0 | 1>(0)
	const [edit_data, set_edit_data] = useState<TAll_req | null>(null)
	const [validates, set_validates] = useState<Array<{status: boolean, errormessage: string}>>([])
	const [price, set_price] = useState<number>(get_price(ad_name))

	const default_value = {
		edit_data, set_edit_data,
		validates, set_validates,
		price, set_price,
	}

	switch(step) {
		case 0:
			return (
				<Edit_data_context.Provider value={default_value}>
					<Editing {...{ad_name, set_step}}/>
				</Edit_data_context.Provider>
			)
		case 1: return <Edited/>
	}
}
