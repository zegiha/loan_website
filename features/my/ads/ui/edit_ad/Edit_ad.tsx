import style from './style.module.scss'
import react_state_action from "@/shared/type/react_state_action";
import {TAds_name, TAds_type, TAll_req} from "@/shared/type";
import {ReactNode, useState} from "react";
import Editing from "@/features/my/ads/ui/edit_ad/Editing";
import Edit_data_context from "@/features/my/ads/context/edit_data_context";
import {Col} from "@/components/atoms/layout";

export default function Edit_ad({
	set_is_open,
	ad_type,
	ad_name,
}: {
	set_is_open: react_state_action<boolean>
	ad_type: TAds_type
	ad_name: TAds_name
}) {
	const [step, set_step] = useState<0 | 1>(0)
	const [edit_data, set_edit_data] = useState<TAll_req | null>(null)
	const [validates, set_validates] = useState<Array<{status: boolean, errormessage: string}>>([])

	const default_value = {
		edit_data, set_edit_data,
		validates, set_validates
	}

	const switcher = (step: 0 | 1): ReactNode => {
		switch(step) {
			case 0:
				return (
					<Edit_data_context.Provider value={default_value}>
						<Editing {...{ad_name, ad_type}}/>
					</Edit_data_context.Provider>
				)
			case 1: return <>hoho</>
		}
	}

	return (
		<div
			className={style.modal_wrapper}
		  onClick={e => e.stopPropagation()}
		>
			<Col className={style.container}>
				<Col className={style.wrapper}>
					{switcher(step)}
				</Col>
			</Col>
		</div>
	)
}