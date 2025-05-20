'use server'
import {Col, Divider, Row} from "@/components/atoms/layout";
import style from './footer.module.scss';
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import LogoImage from '@/public/assets/colorLogo.png';
import {semantic_object} from "@/shared/color";

export default async function Footer() {
  return (
    <Col width={'fill'} alignItems={'center'} style={{backgroundColor: semantic_object.surface.surfaceDim}}>
      <Row
        width={'fill'}
        className={style.footerContainer}
      >
        <div className={style.section}>
          <Image
            src={LogoImage}
            alt={'풋터 로고 이미지'}
            width={142}
            height={36}
          />
          <Col gap={12}>
            <Typo.SubBody emphasize color={'variable'}>
              고객센터
            </Typo.SubBody>
            <Col gap={8}>
              <Col gap={4}>
                <Typo.Contents emphasize>
                  정보
                </Typo.Contents>
                <Typo.Contents>
                  직통번호 : 070-8080-1728
                </Typo.Contents>
                <Typo.Contents>
                  351-1306-9323-03 옹양훈(MNG)대부중개,
                </Typo.Contents>
              </Col>
              <Col gap={4}>
                <Typo.Contents emphasize>
                  영업시간
                </Typo.Contents>
                <Typo.Contents>
                  평일 9:30 - 18:00 / 점심시간 12:00 - 13:00
                </Typo.Contents>
                <Typo.Contents>
                  국경일 및 토, 일 휴무
                </Typo.Contents>
              </Col>
            </Col>
          </Col>
        </div>
        <Col gap={12} width={'fill'}>
          <Row gap={32} width={'fill'} className={style.section}>
            <Typo.Contents width={'fill'} color={'variable'} isPre>
              사이트명 : 대출센터{'\n'}
              상호명 : (MnG)대부중개{'\n'}
              대표자 : 옹양훈{'\n'}
              개인정보책임자 : 옹양훈{'\n'}
              주소 : 경기도 광주시 초월읍 산수로 497, 대보빌딩 4층{'\n'}
            </Typo.Contents>
            <Typo.Contents width={'fill'} color={'variable'} isPre>
              사업자등록번호 : 393-74-00636{'\n'}
              대부중개업등록번호 : 2024-경기광주-0002{'\n'}
              대부업등록기관 : 경기 광주 지방자치단체 031-760-4733{'\n'}
              통신판매업 신고 : 2024-경기이천-0577{'\n'}
              계좌번호 안내 : 농협은행 351-1306-9323-03 옹양훈(MNG)대부중개{'\n'}
            </Typo.Contents>
          </Row>
          <Typo.Contents>
            COPYRIGHT ⓒ 2025. (MnG)대부중개 ALL RIGHTS RESERVED.
          </Typo.Contents>
        </Col>
      </Row>
      <Divider/>
      <Col
        width={'fill'}
        gap={12}
        className={style.footerContainer}
      >
        <Col>
          <Typo.SubBody emphasize color={'variable'} isPre>
            대출센터에 기재된 광고내용은 게시자의 정보로써 이를 신뢰하여 취한 조치에 대해 어떠한 의무와 책임을 지지 않으며{'\n'}
            대출센터는 직접적인 대출 및 중개를 하지 않습니다.{'\n'}
          </Typo.SubBody>
          <Typo.Contents color={'dim'} isPre>
            상환기간 예시 : 모든 개인대출은 상환기간이 최단 60일이상, 최대 상환기간은 12개월(해당 업체 상의){'\n'}
            총 대출 예시 비용: 100만원을 12개월 기간동안 이자 최대연이율 24% 원리금균등상환 적용시 총상환금액 1,134,715원 | 채무의 조기상환수수료율 등 조기상환조건 없음.{'\n'}
            금리 연24%이내, 연체이자율 24% 이내, 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음{'\n'}
          </Typo.Contents>
        </Col>
        <Typo.SubBody emphasize>
          <span style={{color: semantic_object.errorContainer.onErrorContainer}}>
            과도한빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다.
          </span>
        </Typo.SubBody>
      </Col>
    </Col>
  );
}
