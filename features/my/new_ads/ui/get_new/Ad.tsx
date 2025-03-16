'use client'

import {Col, Row} from "@/components/atoms/layout";
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton} from "@/components/molecules/inputs";
import CheckIcon from "@/components/atoms/icons/CheckIcon";
import {IAd} from "@/features/my/new_ads/type";
import style from "@/features/my/new_ads/ui/style.module.scss";
import {useState} from "react";
import Modal from "@/components/molecules/modal/Modal";
import {SwiperPaginationAndNavigation} from "@/components/organisms";
import {SwiperSlide} from "swiper/react";

interface IAd_prop extends IAd {
  onClick: () => void
  active: boolean
}

export default function Ad({
  name,
  price_desc,
  sub_price_desc,
  desc,
  sub_desc,
  pc_preview_img,
  mobile_preview_img,
  onClick,
  active
}: IAd_prop) {
  const [is_modal_open, set_is_modal_open] = useState<boolean>(false);
  const [modal_contents, set_modal_contents] = useState<'pc' | 'mobile' | null>(null);
  return (
    <>
      <Col gap={24} width={'fill'}>
        <div className={style.img_desc_container}>
          <Col gap={28} width={'fill'}>
            <Col gap={16}>
              <Typo.Title emphasize color={'variable'}>
                {name}
              </Typo.Title>
              <Col width={'fill'} gap={12}>
                <Col width={'fill'} gap={8}>
                  {price_desc.map((v, i) => (
                    <Row gap={12} key={i}>
                      <Typo.Body emphasize color={'variable'}>
                        {v.desc}
                      </Typo.Body>
                      <Typo.Body emphasize color={'primary'}>
                        {v.price.toLocaleString()}
                      </Typo.Body>
                    </Row>
                  ))}
                </Col>
                {sub_price_desc && (
                  <Row gap={12}>
                    <Typo.SubBody color={'variable'} emphasize>
                      {sub_price_desc.desc}
                    </Typo.SubBody>
                    <Typo.SubBody color={'primary'} emphasize>
                      {sub_price_desc.price.toLocaleString()}
                    </Typo.SubBody>
                  </Row>
                )}
              </Col>
            </Col>
            <Col width={'fill'} gap={4}>
              <Typo.Contents width={'fill'} isPre={'wrap'}>
                {desc}
              </Typo.Contents>
              {sub_desc && (
                <Typo.Caption width={'fill'} isPre={'wrap'} color={'dim'}>
                  {sub_desc}
                </Typo.Caption>
              )}
            </Col>
          </Col>
          <div className={style.img_container}>
            <Image
              src={pc_preview_img[0]}
              alt={'광고 예시 이미지'}
              fill
              style={{borderRadius: 12}}
            />
          </div>
        </div>
        <Row width={'fill'} gap={16} className={style.ad_more_button_container}>
          <BaseButton
            className={style.outline_fill_button_44}
            onClick={() => {
              set_modal_contents('pc')
              set_is_modal_open(true);
            }}
          >
            <Typo.Contents>
              PC 광고 위치 크게 보기
            </Typo.Contents>
          </BaseButton>
          <BaseButton
            className={style.outline_fill_button_44}
            onClick={() => {
              set_modal_contents('mobile')
              set_is_modal_open(true);
            }}
          >
            <Typo.Contents>
              모바일 광고 위치 크게 보기
            </Typo.Contents>
          </BaseButton>
        </Row>
        <BaseButton
          className={active ?
            style.add_to_cart_button_active : style.add_to_cart_button}
          onClick={onClick}
        >
          <CheckIcon/>
          <Typo.Contents emphasize>바구니에 추가하기</Typo.Contents>
        </BaseButton>
      </Col>
      <Modal isOpen={is_modal_open} setIsOpen={set_is_modal_open}>
        <div
          className={style.modal_wrapper}
          onClick={e => e.stopPropagation()}
        >
          <SwiperPaginationAndNavigation height={'100%'}>
            {modal_contents === 'pc' ? pc_preview_img.map((v, i) => (
              <SwiperSlide key={`${i}-slide`} style={{width: '100%', height: '100%'}}>
                <Image
                  src={v}
                  alt={'pc_preview_img'}
                  fill
                  objectFit={'contain'}
                />
              </SwiperSlide>
            )) : mobile_preview_img.map((v, i) => (
              <SwiperSlide key={`${i}-slide`} style={{width: '100%', height: '100%'}}>
                <Image
                  src={v}
                  alt={'mobile_preview_img'}
                  fill
                  objectFit={'contain'}
                />
              </SwiperSlide>
            ))}
          </SwiperPaginationAndNavigation>
        </div>
      </Modal>
    </>
  );
}
