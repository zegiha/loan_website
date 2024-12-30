import {Col} from "@/components/atoms/layout";
import Add_contents from "@/features/my/ads/ui/Add_contents";
import Section_wrapper from "@/features/my/ui/Section_wrapper";

export default function My_ads() {
	return (
		<Col width={'fill'}>
			<Section_wrapper>
				<Add_contents/>
			</Section_wrapper>
		</Col>
	);
}