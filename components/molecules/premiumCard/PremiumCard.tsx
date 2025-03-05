import Typo from "@/components/atoms/typo/Typo";
import style from './premiumCard.module.scss';
import {Col, Divider, Row} from "@/components/atoms/layout";
import {LocationIcon} from "@/components/atoms/icons";
import {IPremium_banner_data} from "@/shared/type";

export default function PremiumCard({
  title,
  location,
  name
}: IPremium_banner_data) {
  return (
    <Col gap={12} className={style.premiumCardContainer}>
      <Col gap={4} width={'fill'}>
        <Typo.Contents emphasize color={'variable'}>
          {title}
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
