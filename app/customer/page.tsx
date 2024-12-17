import {Col, Row} from "@/components/atoms/layout";
import {Section} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'

export default function Customer_center() {
  return (
    <Col width={'fill'}>
      <Section backgroundColor={'surface'}>
        <Typo.Title emphasize color={'variable'}>고객센터</Typo.Title>
        <Col gap={24} width={'fill'}>
          <Row gap={16} width={'fill'} className={style.responsive}>
            <Col gap={8} width={'fill'}>
              <Chip>대표번호</Chip>
              <Col gap={4} width={'fill'}>
                <Row gap={4} alignItems={'center'}>
                  <Typo.Contents color={'dim'}>대표자 번호 : </Typo.Contents>
                  <Typo.SubBody emphasize color={'variable'}>010-8999-6968</Typo.SubBody>
                </Row>
              </Col>
            </Col>
            <Col gap={8} width={'fill'}>
              <Chip>이메일</Chip>
              <Col gap={4} width={'fill'}>
                <Typo.SubBody emphasize color={'variable'}>email@email.com</Typo.SubBody>
              </Col>
            </Col>
          </Row>
          <Row gap={16} width={'fill'} className={style.responsive}>
            <Col gap={8} width={'fill'}>
              <Chip>업무시간</Chip>
              <Col gap={4} width={'fill'}>
                <Row gap={4} alignItems={'center'}>
                  <Typo.Contents color={'dim'}>영업시간 : </Typo.Contents>
                  <Typo.SubBody emphasize color={'variable'}>AM 09:00 ~ PM 18:00</Typo.SubBody>
                </Row>
              </Col>
            </Col>
            <Col gap={8} width={'fill'}>
              <Chip>이메일</Chip>
              <Col gap={4} width={'fill'}>
                <Typo.SubBody emphasize color={'variable'}>국민은행 773901-01-562759</Typo.SubBody>
                <Typo.Contents color={'dim'}>예금주 강진우</Typo.Contents>
              </Col>
            </Col>
          </Row>
        </Col>
      </Section>
    </Col>
  )
}

function Chip({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Row
      justifyContents={'center'}
      alignItems={'center'}
      className={style.chip}
    >
      <Typo.Contents color={'primary'} emphasize>
        {children}
      </Typo.Contents>
    </Row>
  )
}
