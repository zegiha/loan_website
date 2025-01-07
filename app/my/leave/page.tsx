import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/features/my/ui/Section_wrapper";
import Leave_contents from "@/features/my/leave/ui/Leave_contents";

export default function Leave_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper>
        <Col width={'fill'} alignItems={'center'}>
          <Leave_contents/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
