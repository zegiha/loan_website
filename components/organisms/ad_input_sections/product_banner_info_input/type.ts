import {IProduct_banner_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface IProduct_banner_info_input {
	banner_info: IProduct_banner_req
	set_banner_info: react_state_action<IProduct_banner_req>

  prevImg?: string | File

	available_productions: Array<number | null>
	set_available_productions: react_state_action<Array<number | null>>

	check_available_productions: Set<number>
	set_check_available_productions: react_state_action<Set<number>>

	production_num: number
	set_production_num: react_state_action<number>

	production_num_string: string
	set_production_num_string: react_state_action<string>

	available_location: number | null
	set_available_location: react_state_action<number | null>
}
