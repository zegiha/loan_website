import {createContext} from "react";
import {TAll_req} from "@/shared/type";
import react_state_action from "@/shared/type/react_state_action";

interface IEdit_data_context {
	edit_data: TAll_req | null
	set_edit_data: react_state_action<TAll_req | null>
	validates: Array<{status: boolean, errormessage: string}>
	set_validates: react_state_action<Array<{status: boolean, errormessage: string}>>
}

const Edit_data_context = createContext<IEdit_data_context | null>(null)
export default Edit_data_context