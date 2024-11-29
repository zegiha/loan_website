import {TextTableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";

export default function LoanDetailsTextTableRow({
  title,
  contents
}: {title: string, contents: string}) {
  return <TextTableRow>
    <Typo.Contents width={120} color={'dim'}>
      {title}
    </Typo.Contents>
    <Typo.Contents width={'fill'}>
      {contents}
    </Typo.Contents>
  </TextTableRow>
}
