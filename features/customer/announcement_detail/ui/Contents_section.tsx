import Typo from "@/components/atoms/typo/Typo";
import {Section} from "@/components/molecules";

export default function Contents_section({
  contents
}: {
  contents: string
}) {
  return (
    <Section backgroundColor={'surface'}>
      <Typo.Contents width={'fill'} isPre={'wrap'}>
        {contents}
      </Typo.Contents>
    </Section>
  )
}
