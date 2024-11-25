import Typo from "@/components/atoms/typo/Typo";
import style from './premiumCard.module.scss';
import {Col, Divider, Row} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";
import {LocationIcon} from "@/components/atoms/icons";
import {TPremiumCard} from "@/features/home/PremiumBannerAndRealTimeLoanSection/type";

export default function PremiumCard({
  title,
  location,
  name
}: TPremiumCard) {
  return (
    <Col gap={12} width={'fill'} className={style.premiumCardContainer}>
      <Col gap={4} width={'fill'}>
        <Typo.Contents emphasize color={'variable'}>
          {title.map((v, i) => {
            if(v.type === 'primary') return (
              <span key={i} className={semantic.onGenericOnGenericPrimary}>
                {v.contents}
              </span>
            );
            return v.contents
          })}
        </Typo.Contents>
        <Row gap={4} alignItems={'center'}>
          <LocationIcon
            size={20}
            color={'dim'}
            fill
          />
          <Typo.Contents color={'dim'}>
            {location}
          </Typo.Contents>
        </Row>
      </Col>
      <Divider/>
      <Row gap={12} width={'fill'}>
        <Typo.Contents color={'dim'} width={'fill'}>
          {name}
        </Typo.Contents>
        <Typo.Contents color={'dim'}>
          자세히보기
        </Typo.Contents>
      </Row>
    </Col>
  );
}
