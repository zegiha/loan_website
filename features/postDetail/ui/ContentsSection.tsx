import {DetailsContentsSection} from "@/components/organisms";
import Typo from "@/components/atoms/typo/Typo";

export default function ContentsSection({contents}: {contents: string}) {
  return <DetailsContentsSection subTitle={'문의 내용'}>
    <Typo.Contents width={'fill'} isPre>
      {contents}
    </Typo.Contents>
  </DetailsContentsSection>
}
