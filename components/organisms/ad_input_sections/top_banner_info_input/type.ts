import {ITop_banner_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface ITop_banner_info_input {
	banner_info: ITop_banner_req
	set_banner_info: react_state_action<ITop_banner_req>

  prevImg?: string | File
}
