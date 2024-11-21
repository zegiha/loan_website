import Section from "@/components/molecules/section/Section";
import Row from "@/components/atom/layout/Row";
import {Col} from "@/components/atom/layout/Col";
import style from './premiumBannerAndRealTimeLoanSection.module.scss';
import {CSSProperties} from "react";
import Typo from "@/components/atom/typo/Typo";
import semantic from '@/shared/color/semanticPalette.module.scss'

export default function PremiumBannerAndRealTimeLoanSection() {
  return (
    <Section backgroundColor={'surfaceDim'}>
      <Col alignItems={'center'} width={'fill'}>
        <Row width={'fill'} gap={24} style={{maxWidth: 1440}}>
          <Box propStyle={{flex: 2}}>
            <Typo.SubBody emphasize color={'variable'}>
              <span className={semantic.onGenericOnGenericPrimary}>
                {`프리미엄 `}
              </span>
              대부업체
            </Typo.SubBody>
          </Box>
          <Box propStyle={{flex: 1}}>
            <Row width={'fill'} justifyContents={'space-between'} alignItems={'center'}>
              <Typo.SubBody emphasize color={'variable'}>
                실시간 대출 문의
                <span className={semantic.onGenericOnGenericPrimary}>
                  {` 18`}
                </span>
                건
              </Typo.SubBody>
              <div className={style.plusButton}>

              </div>
            </Row>

          </Box>
        </Row>
      </Col>
    </Section>
  );
}

function Box({children, propStyle}: {children: React.ReactNode, propStyle?: CSSProperties}) {
  return (
    <Col gap={24} className={style.box} style={propStyle}>
      {children}
    </Col>
  );
}
