'use client'

import {Col} from "@/components/atoms/layout";
import PremiumBannerAndProductCategoriesSelectionSection
  from "@/features/loanByProduct/ui/premiumBannerAndProductCategoriesSelectionSection/PremiumBannerAndProductCategoriesSelectionSection";
import {useState} from "react";
import RegisteredCompanySection from "@/features/loanByProduct/ui/RegisteredCompanySection";
import RegisteredCompanyTableSection from "@/features/loanByProduct/ui/RegisteredCompanyTableSection";

export default function LoanByProduct() {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set)
  return (
    <Col width={'fill'}>
      <PremiumBannerAndProductCategoriesSelectionSection setActiveCategoriesAction={setActiveCategories}/>
      <RegisteredCompanySection activeCategories={activeCategories}/>
      <RegisteredCompanyTableSection activeCategories={activeCategories}/>
    </Col>
  );
}
