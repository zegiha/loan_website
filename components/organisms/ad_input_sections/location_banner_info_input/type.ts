import {ILocation_banner_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface ILocation_banner_info_input {
	banner_info: ILocation_banner_req
	set_banner_info: react_state_action<ILocation_banner_req>

	available_locations: Array<number | null>
	set_available_locations: react_state_action<Array<number | null>>

	check_available_locations: Set<number>
	set_check_available_locations: react_state_action<Set<number>>

	selected_option_idx: number | null
	set_selected_option_idx: react_state_action<number | null>

	location_num: number
	set_location_num: react_state_action<number>

	location_num_string: string
	set_location_num_string: react_state_action<string>
}