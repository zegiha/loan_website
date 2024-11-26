'use server'

import {Col} from "@/components/atoms/layout";
import PremiumBannerAndCategories
  from "@/features/loanByLocation/premiumBannerAndCategories/PremiumBannerAndCategories";

export default async function LoanByLocation() {
  return (
    <Col width={'fill'}>
      <PremiumBannerAndCategories/>
    </Col>
  );
}
