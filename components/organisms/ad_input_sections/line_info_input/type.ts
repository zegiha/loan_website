import {ILine_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface ILine_info_input {
	banner_info: ILine_req
	set_banner_info: react_state_action<ILine_req>
}