import {ReactElement} from "react";
import Quickbar from "@/components/molecules/Layout/quickbar/Quickbar";

export default function Quickbar_layout({
	children,
}: {
	children: ReactElement
}) {
	return (
		<>
			{children}
			<Quickbar/>
		</>
	)
}