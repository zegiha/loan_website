'use client'

import {Col} from "@/components/atoms/layout";
import Display_section from "@/features/loan_certified/ui/Display_section";
import {useState} from "react";
import Companies_section from "@/features/loan_certified/ui/Companies_section";

export default function Certified_company() {
  const [search, set_search] = useState<string>('')
  return (
    <Col width={'fill'}>
      <Display_section search={search} set_search={set_search}/>
      <Companies_section search={search}/>
    </Col>
  )
}
