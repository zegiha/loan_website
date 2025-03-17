import {Col} from "@/components/atoms/layout";
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";

export default function Info_input_section({
	children,
	title
}: {
	children: React.ReactNode | string,
	title: string
}) {
	return (
		<Col width={'fill'}>
			<Typo.Body emphasize color={'variable'}>{title}</Typo.Body>
			<InputSection style={{width: '100%'}}>
				{children}
			</InputSection>
		</Col>
	);
}
