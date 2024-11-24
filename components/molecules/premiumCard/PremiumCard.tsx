import Typo from "@/components/atoms/typo/Typo";
import style from './premiumCard.module.scss';
import {Col, Divider, Row} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";
import {LocationIcon} from "@/components/atoms/icons";

export default function PremiumCard() {
  return (
    <Col gap={12} width={'fill'} className={style.premiumCardContainer}>
      <Col gap={4} width={'fill'}>
        <Typo.Contents emphasize color={'variable'}>
          <span className={semantic.onGenericOnGenericPrimary}>
            {'저신용자 상관없음 '}
          </span>
          무서류 저신용자 상관없음 무서류
        </Typo.Contents>
        <Row gap={4} alignItems={'center'}>
          <LocationIcon
            size={20}
            color={'dim'}
            fill
          />
          <Typo.Contents color={'dim'}>
            전국
          </Typo.Contents>
        </Row>
      </Col>
      <Divider/>
      <Row gap={12} width={'fill'}>
        <Typo.Contents color={'dim'} width={'fill'}>
          스피드 대출
        </Typo.Contents>
        <Typo.Contents color={'dim'}>
          자세히보기
        </Typo.Contents>
      </Row>
    </Col>
  );
}
