import {Col, Divider, Row} from "@/components/atoms/layout";
import {useRandomImage} from '@/shared/hooks'
import style from './style.module.scss';
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import {LocationIcon, PhoneIcon} from "@/components/atoms/icons";
import Link from "next/link";
import {ICompany_banner_data} from "@/shared/type";

export default function Banner({
  id,
  title,
  subtitle,
  name,
  phone,
  location,
  img_url,
}: ICompany_banner_data) {
  const {img} = useRandomImage(img_url)

  return (
    <Link href={`/loan/${id}`}>
      <Col
        width={'fill'}
        gap={12}
        className={style.container}
      >
        <Col
          width={'fill'}
          gap={4}
        >
          <Row
            justifyContents={'center'}
            alignItems={'center'}
            className={style.imgContainer}
          >
            <Row
              justifyContents={'center'}
              alignItems={'center'}
              className={style.imgWrapper}
            >
              <Typo.SubBody
                emphasize
                width={'fill'}
                textAlign={'center'}
                className={style.imgVariableTitle}
              >
                {title}
              </Typo.SubBody>
            </Row>
            <div className={style.imgCover}/>
            <div className={style.img}>
              {img && (
                <Image
                  src={img}
                  alt={'업체 이미지'}
                  fill={true}
                />
              )}
            </div>
          </Row>
          <Typo.Contents
            color={'dim'}
            textAlign={'center'}
            className={style.imgTitle}
            textOverflowLine={2}
          >
            {subtitle}
          </Typo.Contents>
        </Col>
        <div style={{
          width: '100%',
          padding: '0 16px',
        }}>
          <Divider/>
        </div>
        <Col
          gap={8}
          width={'fill'}
          style={{
            padding: '0 16px',
          }}
        >
          <Row gap={4}>
            <PhoneIcon
              size={20}
              color={'variable'}
              fill
            />
            <Typo.Contents color={'variable'}>
              {phone}
            </Typo.Contents>
          </Row>
          <Row
            width={'fill'}
            gap={12}
          >
            <Row gap={4}>
              <LocationIcon
                size={20}
                color={'dim'}
              />
              <Typo.Contents color={'dim'}>
                {location}
              </Typo.Contents>
            </Row>
            <Typo.Contents width={'fill'} color={'dim'} textAlign={'end'}>
              {name}
            </Typo.Contents>
          </Row>
        </Col>
      </Col>
    </Link>
  );
}
