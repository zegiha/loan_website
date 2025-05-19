import {IPremium_banner_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface IPremium_banner_info_input {
	banner_info: IPremium_banner_req
	set_banner_info: react_state_action<IPremium_banner_req>

	selected_available_location_idx: Array<number>
	set_selected_available_location_idx: react_state_action<Array<number>>
}