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
          대출센터에 기재된 광고내용은 게시자의 정보로써 이를 신뢰하여 취한 조치에 대해 어떠한 의무와 책임을 지지 않으며{'\n'}
          대출센터는 직접적인 대출 및 중개를 하지 않습니다.{'\n'}
        </Typo.SubBody>
        <Typo.Contents color={'dim'} isPre>
          상환기간 예시 : 모든 개인대출은 상환기간이 최단 61일이상, 최대 상환기간은 12개월(해당 업체 상의){'\n'}
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
  )
}
