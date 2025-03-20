import Quickbar_layout from "@/components/organisms/layout/Quickbar_layout";
import {ReactElement} from "react";

export default function Layout({ children }: { children: ReactElement}) {
	return (
		<Quickbar_layout>
			{children}
		</Quickbar_layout>
	)
}