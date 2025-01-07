import {Col} from "@/components/atoms/layout";
import Leave_contents from "@/features/my/leave/ui/Leave_contents";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import my_navigations from "@/features/my/lib/my_navigations";

export default function Leave_page() {
  return (
    <Col width={'fill'}>
      <Section_wrapper navigations={my_navigations}>
        <Col width={'fill'} alignItems={'center'}>
          <Leave_contents/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
