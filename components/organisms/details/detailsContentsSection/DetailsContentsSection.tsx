import {Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";

export default function DetailsContentsSection({subTitle, children}: {subTitle: string, children: React.ReactNode}) {
  return (
    <Section backgroundColor={'surface'}>
      <Typo.Body emphasize color={'variable'}>
        {subTitle}
      </Typo.Body>
      {children}
    </Section>
  );
}
