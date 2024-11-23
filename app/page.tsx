import DisplaySection from "@/features/home/displaySection/DisplaySection";
import PremiumBannerAndRealTimeLoanSection
  from "@/features/home/PremiumBannerAndRealTimeLoanSection/PremiumBannerAndRealTimeLoanSection";
import {Col} from "@/components/atoms/layout";

export default function Home() {
  return (
    <Col style={{width: '100%'}}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
    </Col>
  );
}
