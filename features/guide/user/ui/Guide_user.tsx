import {Col} from "@/components/atoms/layout";
import React from "react";
import First from "@/features/guide/user/ui/First";
import Second from "@/features/guide/user/ui/Second";

export default function Guide_user() {
  return (
    <Col width={'fill'} gap={64}>
      <First/>
      <Second/>
    </Col>
  )
}
