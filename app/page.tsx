import {Col} from "@/components/atom/layout/Col";
import DisplaySection from "@/features/home/displaySection/DisplaySection";
import PremiumBannerAndRealTimeLoanSection
  from "@/features/home/PremiumBannerAndRealTimeLoanSection/PremiumBannerAndRealTimeLoanSection";

export default function Home() {
  return (
    <Col style={{width: '100%'}}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
    </Col>
  );
}
