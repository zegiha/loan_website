import {Col} from "@/components/atoms/layout";
import Logout_contents from "@/features/my/logout/ui/Logout_contents";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import my_navigations from "@/features/my/lib/my_navigations";

export default function Logout_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper title={'마이페이지'} navigations={my_navigations}>
        <Col width={'fill'} alignItems={'center'}>
          <Logout_contents/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
