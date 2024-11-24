import {Col, Row} from "@/components/atoms/layout";
import style from './footer.module.scss';
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import LogoImage from '@/public/assets/noColorLogo.png';
import {semantic} from "@/shared/color";

export default function Footer() {
  return (
    <Col width={'fill'} alignItems={'center'}>
      <Row
        width={'fill'}
        gap={24}
        className={style.footerContainer}
      >
        <Image
          src={LogoImage}
          alt={'풋터 로고 이미지'}
          width={213}
          height={45}
        />
        <Col gap={12} width={'fill'}>
          <Row gap={12} width={'fill'}>
            <Typo.Contents width={'fill'} color={'variable'}>
              사이트명 : 넷프로 대출정보
              상호명 : 넷프로
              대표자 : 강진우
              개인정보책임자 : 최민영
              주소 : 광주광역시 북구 동문대로 50 (두암동 771-1) 동강대학교 산학협력관 402호
            </Typo.Contents>
            <Typo.Contents width={'fill'} color={'variable'}>
              사업자등록번호 : 851-17-00177
              대부중개업등록번호 : 대부중개 0000-서울-00000
              대부업등록기관 : 서울시청 일자리경제과 000-000-0000
              통신판매업 신고 : 제2000-서울-0000호
              계좌번호 안내 : 국민은행 773901-01-562750 예금주 : 강진우
            </Typo.Contents>
          </Row>
          <Typo.Contents>
            COPYRIGHT ⓒ 2016. 넷프로 ALL RIGHTS RESERVED.
          </Typo.Contents>
        </Col>
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
                직통번호 : 010-8999-6968
              </Typo.Contents>
              <Typo.Contents>
                국민여행 773901-01-562759 강진우
              </Typo.Contents>
            </Col>
            <Col gap={4}>
              <Typo.Contents emphasize>
                영업시간
              </Typo.Contents>
              <Typo.Contents>
                09:00 ~ 18:00
              </Typo.Contents>
              <Typo.Contents>
                국경일 및 토, 일 휴무
              </Typo.Contents>
            </Col>
          </Col>
        </Col>
      </Row>
      <Col
        width={'fill'}
        gap={12}
        className={style.footerContainer}
      >
        <Col>
          <Typo.SubBody emphasize color={'variable'}>
            넷프로에 기재된 광고내용은 게시자의 정보로써 이를 신뢰하여 취한 조치에 대해 어떠한 의무와 책임을 지지 않으며
            넷프로는 직접적인 대출 및 중개를 하지 않습니다.
          </Typo.SubBody>
          <Typo.Contents color={'dim'}>
            상환기간 예시 : 모든 개인대출은 상환기간이 최단 60일이상, 최대 상환기간은 12개월(해당 업체 상의)
            총 대출 예시 비용: 100만원을 12개월 기간동안 이자 최대연이율 24% 원리금균등상환 적용시 총상환금액 1,134,715원 | 채무의 조기상환수수료율 등 조기상환조건 없음.
            금리 연24%이내, 연체이자율 24% 이내, 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음
          </Typo.Contents>
        </Col>
        <Typo.SubBody emphasize>
          <span className={semantic.errorContainerOnErrorContainer}>
            과도한빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다.
          </span>
        </Typo.SubBody>
      </Col>
    </Col>
  );
}
