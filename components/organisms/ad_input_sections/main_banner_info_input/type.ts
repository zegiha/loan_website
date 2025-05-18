import {IBanner_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface IMain_banner_info_input {
	banner_info: IBanner_req
	set_banner_info: react_state_action<IBanner_req>

	selected_available_location_idx: number | null
	set_selected_available_location_idx: react_state_action<number | null>

  prevImg?: string | File
}
