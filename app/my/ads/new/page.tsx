import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/features/my/ui/Section_wrapper";
import New_ads from "@/features/my/new_ads/New_ads";

export default function My_ads_new() {
  return (
    <Col width={'fill'}>
      <Section_wrapper>
        <New_ads/>
      </Section_wrapper>
    </Col>
  );
}
