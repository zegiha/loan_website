import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import customer_navigations from "@/features/customer/lib/customer_navigations";
import Faq_contents from "@/features/customer/faq/ui/Faq_contents";

export default function Faq_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper title={'고객센터'} navigations={customer_navigations}>
        <Faq_contents/>
      </Section_wrapper>
    </Col>
  )
}
