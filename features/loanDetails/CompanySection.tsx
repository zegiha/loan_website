'use client'

import {DetailsContentsSection, TextTable} from "@/components/organisms";
import {Divider, Row} from "@/components/atoms/layout";
import Image from "next/image";
import LoanDetailsTextTableRow from "@/features/loanDetails/ui/LoanDetailsTextTableRow";
import style from './loanDetails.module.scss'

export default function CompanySection({
  contents
}: {
  contents: Array<{title: string, contents: string}>,
}) {
  return (
    <DetailsContentsSection subTitle={'업체'}>
      <Row gap={16} width={'fill'}>
        <TextTable>
          {contents.map((v, i) => (
            i < 3 && <LoanDetailsTextTableRow key={`${i}-first`} {...v}/>
          ))}
          <Divider/>
          {contents.map((v, i) => (
            i >= 3 && <LoanDetailsTextTableRow key={`${i}-second`} {...v}/>
          ))}
        </TextTable>
        <div className={style.imgContainer}>
          <Image
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s'}
            alt={'사업증'}
            width={120}
            height={140.3616}
            style={{objectFit: 'fill'}}
          />
        </div>
      </Row>
    </DetailsContentsSection>
  );
}
