import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import customer_navigations from "@/features/customer/lib/customer_navigations";
import Question_contents from "@/features/customer/Question_contents/ui/Question_contents";

export default function Question_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper title={'고객샌터'} navigations={customer_navigations}>
        <Col width={'fill'} alignItems={'center'}>
          <Question_contents/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
