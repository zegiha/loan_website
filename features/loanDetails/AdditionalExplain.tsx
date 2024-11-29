import {DetailsContentsSection} from "@/components/organisms";
import Typo from "@/components/atoms/typo/Typo";

export default function AdditionalExplain({
  contents
}: {contents: string}) {
  return (
    <DetailsContentsSection subTitle={'부가 설명'}>
      <Typo.Contents width={'fill'} isPre>
        {contents}
      </Typo.Contents>
    </DetailsContentsSection>  );
}
