import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/features/my/ui/Section_wrapper";
import Logout_contents from "@/features/my/logout/ui/Logout_contents";

export default function Logout_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper>
        <Col width={'fill'} alignItems={'center'}>
          <Logout_contents/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
