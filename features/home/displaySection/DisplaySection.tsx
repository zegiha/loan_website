import Typo from "@/components/atoms/typo/Typo";
import style from "./display.module.scss";
import Image from "next/image";
import {Col, Row} from "@/components/atoms/layout";
import {semantic} from "@/shared/color";

export default function DisplaySection() {
  return (
    <Col className={style.displaySectionContainer} alignItems="center">
      <div className={style.displaySectionBackgroundBlur}/>
      <div className={style.displaySectionBackground}>
          <Image
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s'}
            alt={'배경'}
            fill={true}
          />
      </div>
      <Col className={style.displaySectionWrapper} gap={32}>
        <Row justifyContents={'space-between'} alignItems={'center'} style={{width: '100%'}}>
          <Col style={{gap: 4}}>
            <Typo.Display emphasize color={'variable'}>
            {'정식 등록 '}
            <span className={semantic.onGenericOnGenericPrimary}>
              대부업체
            </span>
              {'가 '}
              <span className={semantic.onGenericOnGenericPrimary}>
              한 곳
            </span>
              에!
            </Typo.Display>
            <Typo.Body>
              대출문의 회원가입 없이 무료로 이용가능합니다.
            </Typo.Body>
            <Typo.Body>
              실시간 대출문의를 등록하시면 빠른 상담이 가능합니다.
            </Typo.Body>
          </Col>
          <Col alignItems={'end'} gap={12}>
            <Row
              style={{padding: '16px 32px', borderRadius: 12}}
              className={semantic.primaryPrimaryNormal}
            >
              <Typo.Title emphasize className={semantic.primaryOnPrimary}>
                지금 대출 문의하기
              </Typo.Title>
            </Row>
            <Row gap={24}>
              <RealTime
                label={'총 등록 업체'}
                contents={'19개'}
              />
              <RealTime
                label={'누적 방문자'}
                contents={'4599명'}
              />
              <RealTime
                label={'실시간 대출 문의'}
                contents={'35개'}
              />
            </Row>
          </Col>
        </Row>
        <div className={style.test}>
          <TopADCard/>
          <TopADCard/>
          <TopADCard/>
        </div>
      </Col>
    </Col>
  );
}

function RealTime({contents, label}: {contents: string, label: string}) {
  return (
    <Col gap={4} alignItems={'center'}>
      <Typo.Title emphasize>{contents}</Typo.Title>
      <Typo.Body>{label}</Typo.Body>
    </Col>
  );
}

function TopADCard() {
  return (
    <Col gap={12} className={style.topAdCardContainer}>
      <Row gap={24} alignItems={'center'} width={'fill'}>
        <Col gap={12}>
          <Col gap={4}>
            <Typo.Body color={'variable'} emphasize>
              <span className={semantic.onGenericOnGenericPrimary}>
                {'TOP 메인 '}
              </span>
              광고주를 모십니다!
            </Typo.Body>
            <Typo.Contents color={'dim'}>
              TOP 메인 광고주를 모십니다!
              1670-2962로 문의주세요!
            </Typo.Contents>
          </Col>
          <Typo.SubBody emphasize>
            넷프로 대출
          </Typo.SubBody>
        </Col>
        <div className={style.topAdCardImageContainer}>
          <Image
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s'}
            alt={'TOP AD Card 이미지'}
            fill={true}
            className={style.topAdCardImage}
          />
        </div>
      </Row>
      <Row width={'fill'} justifyContents={'space-between'} alignItems={'center'}>
        <Row gap={4} alignItems={'center'}>
          <div style={{width: 20, height: 20, background: 'gray'}}/>
          <Typo.Contents color={'dim'}>
            전국
          </Typo.Contents>
        </Row>
        <Typo.Contents emphasize color={'variable'}>
          눌러서 광고 신청
        </Typo.Contents>
      </Row>
    </Col>
  );
}
