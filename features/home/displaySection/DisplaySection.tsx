import Typo from "@/components/atoms/typo/Typo";
import style from "./display.module.scss";
import Image from "next/image";
import {Col, Row} from "@/components/atoms/layout";
import {semantic_object} from "@/shared/color";
// import {LocationIcon} from "@/components/atoms/icons";
// import LoanQuestionButton from "@/features/home/displaySection/LoanQuestionButton";
import getWebStatus from "@/features/home/displaySection/api/getWebStatus";
import getTopAds, {ITopAd} from "@/features/home/displaySection/api/getTopAds";

export default async function DisplaySection() {
  const {totalLoanCompany, cumulativeVisiter, realTimeLoan} = await getWebStatus();

  // const

  const topAds = await getTopAds();
  return (
    <Col className={style.displaySectionContainer} alignItems="center">
      <div className={style.displaySectionBackgroundBlur}/>
      <div className={style.displaySectionBackground}/>
      <Col className={style.displaySectionWrapper} gap={24}>
        <Row
          justifyContents={'space-between'}
          alignItems={'center'}
          gap={24}
          width={'fill'}
          className={style.topSection}
        >
          <Col style={{gap: 4}}>
            <Typo.Header isPre emphasize color={'variable'}>
              {'정식 등록 '}
              <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
              대부업체
            </span>
              {'가 '}
              <span style={{color: semantic_object.onGeneric.onGenericPrimary}}>
              한 곳
            </span>
              에!
            </Typo.Header>
            <Typo.SubBody>
              대출문의 회원가입 없이 무료로 이용가능합니다.
            </Typo.SubBody>
            <Typo.SubBody>
              실시간 대출문의를 등록하시면 빠른 상담이 가능합니다.
            </Typo.SubBody>
          </Col>
          <Col gap={12} className={style.buttonSection}>
            {/*<LoanQuestionButton/>*/}
            <Row gap={24}>
              <RealTime
                label={'총 등록 업체'}
                contents={`${totalLoanCompany}개`}
              />
              <RealTime
                label={'누적 방문자'}
                contents={`${cumulativeVisiter}명`}
              />
              <RealTime
                label={'실시간 대출 문의'}
                contents={`${realTimeLoan}개`}
              />
            </Row>
          </Col>
        </Row>
        <div className={style.test}>
          {topAds.map((v, i) => (
            <TopADCard
              key={i}
              {...v}
            />
          ))}
        </div>
      </Col>
    </Col>
  );
}

async function RealTime({contents, label}: { contents: string, label: string }) {
  return (
    <Col gap={4} alignItems={'center'}>
      <Typo.Body emphasize>{contents}</Typo.Body>
      <Typo.SubBody>{label}</Typo.SubBody>
    </Col>
  );
}

async function TopADCard({
  title,
  contents,
  name,
  imgUrl
}: ITopAd) {
  return (
    <Col gap={12} className={style.topAdCardContainer}>
      <Row gap={16} width={'fill'} className={style.topAdTitleSection}>
        <Col gap={12}>
          <Col gap={4}>
            <Typo.SubBody color={'variable'} emphasize>
              {title.map((v, i) => {
                if(v.type === 'primary') {
                  return <span key={i} style={{color: semantic_object.onGeneric.onGenericPrimary}}>
                    {v.contents}
                  </span>
                }
                return v.contents
              })}
            </Typo.SubBody>
            <Typo.Contents color={'dim'}>
              {contents}
            </Typo.Contents>
          </Col>
          <Typo.Contents emphasize>
            {name}
          </Typo.Contents>
        </Col>
        <div className={style.topAdCardImageContainer}>
          <Image
            src={imgUrl}
            alt={'TOP AD Card 이미지'}
            fill={true}
            className={style.topAdCardImage}
          />
        </div>
      </Row>
    </Col>
  );
}
