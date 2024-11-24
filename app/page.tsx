import {Col} from "@/components/atoms/layout";
import {
  DisplaySection,
  PremiumBannerAndRealTimeLoanSection,
  MainRegisteredCompanySection,
} from "@/features/home";

export default function Home() {
  return (
    <Col style={{width: '100%'}}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
      <MainRegisteredCompanySection/>
    </Col>
  );
}
