import {ILoan} from "@/features/postDetail/type";
import {DetailsContentsSection, TextTable} from "@/components/organisms";
import PostDetailTextTableRow from "@/features/postDetail/ui/PostDetailTextTableRow";

export default function LoanSection({
  loanType,
  location,
  amount
}: ILoan) {
  return <DetailsContentsSection subTitle={'대출'}>
    <TextTable>
      <PostDetailTextTableRow
        title={'지역'}
        contents={location}
      />
      <PostDetailTextTableRow
        title={'희망 금액'}
        contents={amount}
      />
      <PostDetailTextTableRow
        title={'대출 분류'}
        contents={`${loanType}대출`}
      />
    </TextTable>
  </DetailsContentsSection>
}
