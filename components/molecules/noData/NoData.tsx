import {Col} from "@/components/atoms/layout";
import {SearchIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import React from "react";

export default function NoData({
  contents
}: {
  contents: string
}) {
  return (
    <Col
      width={'fill'}
      justifyContents={'center'}
      alignItems={'center'}
      gap={4}
    >
      <SearchIcon
        size={48}
        color={'dim'}
      />
      <Typo.SubBody color={'dim'} emphasize>
        {contents}
      </Typo.SubBody>
    </Col>
  )
}
