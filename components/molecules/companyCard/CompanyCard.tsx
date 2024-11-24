import {Col, Divider, Row} from "@/components/atoms/layout";
import style from './companyCard.module.scss';
import Image from "next/image";
import Typo from "@/components/atoms/typo/Typo";
import {semantic} from "@/shared/color";
import {LocationIcon, PhoneIcon} from "@/components/atoms/icons";

interface ICompanyCard{
  type: 'image' | 'vipText' | 'text';

  imgUrl?: string;
  variableTitle?: string;
  title: string | Array<{type: 'primary' | 'variable', data: string}>;
  phone: string;
  location: string;
  name: string;
}

export default function CompanyCard({
  type,
  imgUrl,
  variableTitle,
  title,
  phone,
  location,
  name,
}: ICompanyCard) {
  return (
    <Col
      width={'fill'}
      gap={12}
      className={type === 'image' ? style.containerTypeImage : style.containerTypeText}
    >
      <Col
        width={'fill'}
        gap={type === 'image' ? 4 : 8}
      >
        {imgUrl && (
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
                {variableTitle}
              </Typo.SubBody>
            </Row>
            <div className={style.imgCover}/>
            <div className={style.img}>
              <Image
                src={imgUrl}
                alt={'업체 이미지'}
                fill={true}
              />
            </div>
          </Row>
        )}
        <Typo.Contents
          color={type === 'vipText' ? 'variable' : 'dim'}
          textAlign={'center'}
          className={type === 'image' ? style.imgTitle : undefined}
          textOverflowLine={2}
        >
          {typeof title === "string" ? (
            title
          ) : (
            title.map((v, i) => {
             if(v.type === 'primary') {
               return <span key={i} className={semantic.onGenericOnGenericPrimary}>
                 {v.data}
               </span>
             }
             return v.data;
            })
          )}
        </Typo.Contents>
      </Col>
      <div style={{
        width: '100%',
        padding: type === 'image' ? '0 16px' : '0',
      }}>
        <Divider/>
      </div>
      <Col
        gap={8}
        width={'fill'}
        style={{
          padding: type === 'image' ? '0 16px' : '0',
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
  );
}
