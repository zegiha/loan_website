import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import customer_navigations from "@/features/customer/lib/customer_navigations";
import Announcement_contents from "@/features/customer/announcement/ui/Announcement_contents";

export default function Announcement_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper title={'고객센터'} navigations={customer_navigations}>
        <Announcement_contents/>
      </Section_wrapper>
    </Col>
  )
}
