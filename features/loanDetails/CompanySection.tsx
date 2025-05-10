'use client'

import {DetailsContentsSection, TextTable} from "@/components/organisms";
import {Divider, Row} from "@/components/atoms/layout";
import LoanDetailsTextTableRow from "@/features/loanDetails/ui/LoanDetailsTextTableRow";
import style from './loanDetails.module.scss'

export default function CompanySection({
  contents,
}: {
  contents: Array<{title: string, contents: string}>,
}) {
  return (
    <DetailsContentsSection subTitle={'업체'}>
      <Row gap={16} width={'fill'} className={style.wrapper}>
        <TextTable>
          {contents.map((v, i) => (
            i < 3 && <LoanDetailsTextTableRow key={`${i}-first`} {...v}/>
          ))}
          <Divider/>
          {contents.map((v, i) => (
            i >= 3 && <LoanDetailsTextTableRow key={`${i}-second`} {...v}/>
          ))}
        </TextTable>
      </Row>
    </DetailsContentsSection>
  );
}
