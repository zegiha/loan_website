import {TextTableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";

export default function PostDetailTextTableRow({title, contents}: {title: string, contents: string}) {
  return <TextTableRow>
    <Typo.Contents width={118} color={'dim'} isPre>{title}</Typo.Contents>
    <Typo.Contents width={'fill'} isPre>{contents}</Typo.Contents>
  </TextTableRow>;
}
