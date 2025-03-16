import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton} from "@/components/molecules/inputs";
import {ArrowAltIcon} from "@/components/atoms/icons";
import {useSelect_context} from "@/features/my/new_ads/context/select_context";
import style from '../style.module.scss'

export default function Bottom_bar({
  onBuyClick
}: {
  onBuyClick: () => void
}) {
  const {select} = useSelect_context()
  return (
    <Col
      gap={16}
      width={'fill'}
      className={style.bottom_ad_bar}
    >
      <Col gap={4} width={'fill'}>
        <Typo.Contents color={'dim'}>선택한 광고</Typo.Contents>
        <Row gap={8} width={'fill'} wrap>
          {select.map((v, i) => (
            <div key={`${v.name}-${i}`} className={style.ad_name_chip}>
              <Typo.Contents>{v.name}</Typo.Contents>
            </div>
          ))}
        </Row>
      </Col>
      <BaseButton
        className={select.length === 0 ?
          style.buy_button_disabled : style.buy_button}
        disabled={select.length === 0}
        onClick={onBuyClick}
      >
        <Typo.SubBody color={'onPrimary'} emphasize>
          {select.length === 0 ?
            '상품을 선택해주세요' : '구매하기'}
        </Typo.SubBody>
        {select.length !== 0 && (
          <ArrowAltIcon color={'white'}/>
        )}
      </BaseButton>
    </Col>
  )
}
