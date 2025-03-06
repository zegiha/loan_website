import {DetailsContentsSection, TextTable} from "@/components/organisms";
import PostDetailTextTableRow from "@/features/postDetail/ui/PostDetailTextTableRow";
import {ILoan_inquiry_detail} from "@/shared/type";

export default function LoanSection({
  category,
  location,
  amount
}: ILoan_inquiry_detail['loan']) {
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
        contents={`${category}대출`}
      />
    </TextTable>
  </DetailsContentsSection>
}
