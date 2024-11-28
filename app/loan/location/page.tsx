'use client'

import {Col} from "@/components/atoms/layout";
import {useState} from "react";
import {
  PremiumBannerAndCategoriesSelectionSection,
  RegisteredCompanyCardSection,
  RegisteredCompanyTableSection
} from "@/features/loanByLocation";

export default function LoanByLocation() {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set);
  return (
    <Col width={'fill'}>
      <PremiumBannerAndCategoriesSelectionSection setActiveCategoriesAction={setActiveCategories}/>
      <RegisteredCompanyCardSection activeCategories={activeCategories}/>
      <RegisteredCompanyTableSection activeCategories={activeCategories}/>
    </Col>
  );
}
