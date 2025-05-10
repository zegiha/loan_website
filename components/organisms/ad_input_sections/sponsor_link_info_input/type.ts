import {ISponsor_link_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

export default interface ISponsor_link_info_input {
	banner_info: ISponsor_link_req
	set_banner_info: react_state_action<ISponsor_link_req>
}