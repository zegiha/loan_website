"use client";
import Typo from "@/components/atoms/typo/Typo";
import {useCommonControllerCommonInfos} from '@/entities/api/common/common'
import {useRandomImage} from '@/shared/hooks'
import style from "./display.module.scss";
import Image from "next/image";
import { Col, Row } from "@/components/atoms/layout";
import { semantic_object } from "@/shared/color";
import { ITopAd } from "@/features/home/displaySection/api/getTopAds";
import { useAdsPublicControllerSearchAds } from "@/entities/api/advertisement-public/advertisement-public";
import skeleton from '@/shared/constants/skeleton.module.scss'

export default function DisplaySection() {
  const {
    status,
    data
  } = useCommonControllerCommonInfos<{
    totalCompany: number
    totalVisitor: number
    totalLoanboard: number
  }>()

  const { data: topAds } = useAdsPublicControllerSearchAds(
    "메인 TOP 배너광고",
    '1',
    '3'
  )
  
  return (
    <Col className={style.displaySectionContainer} alignItems="center">
      <div className={style.displaySectionBackgroundBlur} />
      <div className={style.displaySectionBackground} />
      <Col className={style.displaySectionWrapper} gap={24}>
        <Row
          justifyContents={"space-between"}
          alignItems={"center"}
          gap={24}
          width={"fill"}
          className={style.topSection}
        >
          <Col style={{ gap: 4 }}>
            <Typo.Header isPre emphasize color={"variable"}>
              {"정식 등록 "}
              <span
                style={{ color: semantic_object.onGeneric.onGenericPrimary }}
              >
                대부업체
              </span>
              {"가 "}
              <span
                style={{ color: semantic_object.onGeneric.onGenericPrimary }}
              >
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
            {status === 'success' && (
              <Row gap={24}>
                <RealTime
                  label={"총 등록 업체"}
                  contents={`${data.totalCompany}개`}
                />
                <RealTime
                  label={"누적 방문자"}
                  contents={`${data.totalVisitor}명`}
                />
                <RealTime
                  label={"실시간 대출 문의"}
                  contents={`${data.totalLoanboard}개`}
                />
              </Row>
            )}
          </Col>
        </Row>
        <div className={style.test}>
          {topAds ? (
            topAds.ads.map((v, i) => (
              <TopADCard
                key={i}
                title={v.title ?? ""}
                contents={v.contents ?? ""}
                name={v.user.companyName ?? ""}
                imgUrl={v.image_url ?? ""}
              />
            ))
          ):(
            Array.from({length: 3}).map((_, i) => (
              <TopAdCardSkeleton key={i}/>
            ))
          )}
        </div>
      </Col>
    </Col>
  );
}

function RealTime({ contents, label }: { contents: string; label: string }) {
  return (
    <Col gap={4} alignItems={"center"}>
      <Typo.Body emphasize>{contents}</Typo.Body>
      <Typo.SubBody>{label}</Typo.SubBody>
    </Col>
  );
}

function TopADCard({ title, contents, name, imgUrl }: ITopAd) {
  const {img} = useRandomImage(imgUrl)

  return (
    <Col gap={12} className={style.topAdCardContainer}>
      <Row gap={16} width={"fill"} className={style.topAdTitleSection}>
        <Col gap={12} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <Typo.SubBody color={"variable"} emphasize>
              {title}
            </Typo.SubBody>
            <Typo.Contents color={"dim"}>{contents}</Typo.Contents>
          </Col>
          <Typo.Contents emphasize>{name}</Typo.Contents>
        </Col>
        <div className={style.topAdCardImageContainer}>
          {img !== undefined && img.length > 0 && (
            <Image
              src={img}
              alt={"TOP AD Card 이미지"}
              fill={true}
              className={style.topAdCardImage}
            />
          )}
        </div>
      </Row>
    </Col>
  );
}

function TopAdCardSkeleton() {
  return (
    <Col gap={12} className={style.topAdCardContainer}>
      <Row gap={16} width={"fill"} className={style.topAdTitleSection}>
        <Col gap={12} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <div className={skeleton.skeleton} style={{width: '60%', height: 28}}/>
            <div className={skeleton.skeleton} style={{width: '40%', height: 20}}/>
          </Col>
          <div className={skeleton.skeleton} style={{width: 80, height: 20}}/>
        </Col>
        <div className={style.topAdCardImageContainer}>
          <div className={skeleton.skeleton} style={{width: '100%', height: '100%', borderRadius: 12}}/>
        </div>
      </Row>
    </Col>
  )
}
