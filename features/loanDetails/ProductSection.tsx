import {DetailsContentsSection, TextTable} from "@/components/organisms";
import {Row} from "@/components/atoms/layout";
import LoanDetailsTextTableRow from "@/features/loanDetails/ui/LoanDetailsTextTableRow";
import style from './productionSection.module.scss'

export default function ProductSection({
  contents
}: {
  contents: Array<{title: string, contents: string}>,
}) {
  return (
    <DetailsContentsSection subTitle={'상품'}>
      <Row gap={16} width={'fill'} className={style.wrapper}>
        <TextTable>
          {contents.map((v, i) => (
            i < 5 && (
              <LoanDetailsTextTableRow
                key={i}
                {...v}
              />
            )
          ))}
        </TextTable>
        <TextTable>
          {contents.map((v, i) => (
            i >= 5 && (
              <LoanDetailsTextTableRow
                key={i}
                {...v}
              />
            )
          ))}
        </TextTable>
      </Row>
    </DetailsContentsSection>
  );
}
