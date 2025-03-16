import React from "react";
import {TableRow} from "@/components/molecules";
import style from "@/features/my/new_ads/ui/style.module.scss";
import Typo from "@/components/atoms/typo/Typo";
import {Row} from "@/components/atoms/layout";

export default function Buy_table_row({
  title,
  contents
}: {
  title: string
  contents: React.ReactNode
}) {
  return <TableRow className={style.buy_table_row}>
    <Typo.Contents
      color={'variable'}
      width={92}
      isPre={'wrap'}
    >
      {title}
    </Typo.Contents>
    <Row width={'fill'}>
      {contents}
    </Row>
  </TableRow>
}
