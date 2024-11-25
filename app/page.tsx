'use server'

import {Col} from "@/components/atoms/layout";
import {
  DisplaySection,
  PremiumBannerAndRealTimeLoanSection,
  MainRegisteredCompanySection,
} from "@/features/home";
import RegisterStatusTableAndRealTimeLoanTableSection
  from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/ui/RegisterStatusTableAndRealTimeLoanTableSection";

export default async function Home() {
  return (
    <Col style={{width: '100%'}}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
      <MainRegisteredCompanySection/>
      <RegisterStatusTableAndRealTimeLoanTableSection/>
    </Col>
  );
}
