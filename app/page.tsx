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
    <Col width={'fill'}>
      <DisplaySection/>
      <PremiumBannerAndRealTimeLoanSection/>
      <MainRegisteredCompanySection/>
      <RegisterStatusTableAndRealTimeLoanTableSection/>
    </Col>
  );
}
