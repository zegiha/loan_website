import {Col} from '@/components/atoms/layout'
import Typo from '@/components/atoms/typo/Typo'
import style from '@/components/organisms/layout/footer/footer.module.scss'
import {semantic_object} from '@/shared/color'

export default function BottomSection() {
  return (
    <Col
      width={'fill'}
      gap={12}
      className={style.footerContainer}
    >
      <Col>
        <Typo.SubBody emphasize color={'variable'} isPre>
          대출센터는 광고 플랫폼만 제공할 뿐 직접적인 대출 및 중개를 하지 않습니다.{'\n'}
          대출센터는 한국대부금융협회, 지자체 정식허가 업체만 광고 등록이 가능합니다.{'\n'}
          대출센터에 기재된 광고 내용은 대부(중개)업체가 제공하는 정보로서 이를 신뢰하여 취한 조치에 대하여 어떠한 책임을 지지 않습니다.{'\n'}
        </Typo.SubBody>
        <Typo.Contents color={'dim'} isPre>
          금리 연20% 이내 (연체이자율 포함 20% 이내)(단, 2021.7.7부터 체결, 갱신, 연장되는 계약에 한함), 취급수수료 없음, 중도상환 수수료 없음, 중개수수료 없음, 추가비용 없음.{'\n'}
          상환기간 : 12개월 ~ 60개월 / 총 대출 비용 예시 : 100만원을 12개월 기간 동안 최대 금리 연20% 적용하여 원리금균등상환방법으로 이용하는 경우 총 상환금액 1,111,614원. (단, 대출상품 및 상환방법 등 대출계약 내용에 따라 달라질 수 있습니다.){'\n'}
          채무의 조기상환수수료율 등 조기상환조건 없음.
        </Typo.Contents>
      </Col>
      <Typo.SubBody emphasize>
          <span style={{color: semantic_object.errorContainer.onErrorContainer}}>
            과도한 빚은 당신에게 큰 불행을 안겨줄 수 있습니다. 중개수수료를 요구하거나 받는 것은 불법입니다. 대출 시 귀하의 신용등급이 하락할 수 있습니다.
          </span>
      </Typo.SubBody>
    </Col>
  )
}
