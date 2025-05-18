import {Col} from "@/components/atoms/layout";
import Ad_contents from "@/features/my/ads/ui/Ad_contents";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import my_navigations from "@/features/my/lib/my_navigations";

export default function My_ads() {
	return (
		<Col width={'fill'}>
			<Section_wrapper title={'마이페이지'} navigations={my_navigations}>
        <Ad_contents/>
			</Section_wrapper>
		</Col>
	);
}
