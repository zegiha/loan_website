'use client'

import {Col} from "@/components/atoms/layout";
import {useState} from "react";
import CategorySelectionSection from "@/features/postList/ui/categorySelectionSection/CategorySelectionSection";
import LoanPostTableSection from "@/features/postList/ui/loanPostTableSection/LoanPostTableSection";

export default function PostList() {
  const [activeLoanTypeCategories, setActiveLoanTypeCategories] = useState<Set <string>>(new Set);
  const [activeLocationCategories, setActiveLocationCategories] = useState<Set<string>>(new Set);
  return (
    <Col width={'fill'}>
      {/*<CategorySelectionSection*/}
      {/*  setActiveLocationCategories={setActiveLocationCategories}*/}
      {/*  setActiveLoanTypeCategories={setActiveLoanTypeCategories}*/}
      {/*/>*/}
      <LoanPostTableSection
        activeLoanTypeCategories={activeLoanTypeCategories}
        activeLocationCategories={activeLocationCategories}
      />
    </Col>
  );
}
