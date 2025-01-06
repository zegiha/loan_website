import {Col, Row} from "@/components/atoms/layout";
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton} from "@/components/molecules/inputs";
import CheckIcon from "@/components/atoms/icons/CheckIcon";
import {TAds_contents} from "@/features/my/new_ads/type";
import style from "@/features/my/new_ads/ui/style.module.scss";

interface IAd extends TAds_contents {
  onClick: () => void
  active: boolean
}

export default function Ad({
  img,
  name,
  price,
  description,
  duration,
  onClick,
  active
}: IAd) {
  return (
    <Col gap={24} width={'fill'}>
      <div className={style.img_desc_container}>
        <div className={style.img_container}>
          <Image
            src={img}
            alt={'광고 예시 이미지'}
            fill
          />
        </div>
        <Col gap={8} width={'fill'}>
          <Col gap={4}>
            <Typo.Body emphasize color={'variable'}>
              {name}
            </Typo.Body>
            <Row gap={4}>
              <Typo.SubBody emphasize>
                {price.toLocaleString()}원
              </Typo.SubBody>
              <Typo.SubBody emphasize color={'variable'}>
                {duration}일
              </Typo.SubBody>
            </Row>
          </Col>
          <Typo.Contents width={'fill'} isPre={'wrap'}>
            {description}
          </Typo.Contents>
        </Col>
      </div>
      <BaseButton
        className={active ?
          style.add_to_cart_button_active : style.add_to_cart_button}
        onClick={onClick}
      >
        <CheckIcon/>
        <Typo.Contents emphasize>바구니에 추가하기</Typo.Contents>
      </BaseButton>
    </Col>
  );
}
