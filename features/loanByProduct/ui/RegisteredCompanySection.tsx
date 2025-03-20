import {Banner, Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {semantic_object} from "@/shared/color";
import {formatActiveCategories} from "@/features/loanByLocation/helper";
import {CompanyCardGrid} from "@/components/organisms";
import {useFetch} from "@/shared/hooks";
import {get_company_banner} from "@/shared/api";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_120.json'
import {Row} from "@/components/atoms/layout";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function RegisteredCompanySection({
  activeCategories
}: {activeCategories: Set<string>}) {
  const {data, is_loading} = useFetch(() => get_company_banner('product'))

  return (
    <Section>
      <Typo.Body emphasize color={'variable'}>
          <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
            {formatActiveCategories(activeCategories)}
          </span>
        등록업체
      </Typo.Body>
      {is_loading ? (
        <Row width={'fill'} justifyContents={'center'}>
          <Player src={load} autoplay loop style={{height: 24}}/>
        </Row>
      ) : (
        <CompanyCardGrid>
          {data !== null && (
            data.map((v, i) => (
              <Banner
                key={i}
                {...v}
              />
            ))
          )}
        </CompanyCardGrid>
      )}
    </Section>
  );
}
