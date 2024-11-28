'use client'

import {Section} from "@/components/molecules";
import {BaseButton, button} from "@/components/molecules/inputs";
import style from './detailsTitleSection.module.scss';
import {Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {TPrimaryAndGenericColorString} from "@/shared/type";
import {semantic} from "@/shared/color";

interface ILoanDetailsTitleSectionProps {
  type: 'loan'| 'post';
  title: TPrimaryAndGenericColorString;
}

export default function DetailsTitleSection({type, title}: ILoanDetailsTitleSectionProps) {
  return (
    <Section backgroundColor={'surface'}>
      <BaseButton
        className={style.backButtonContainer}
        onClick={() => console.log('back')}
      >
        <Row gap={12} alignItems={'center'}>
          <ArrowIcon color={'dim'} deg={180}/>
          <Typo.SubBody color={'dim'}>돌아가기</Typo.SubBody>
        </Row>
      </BaseButton>
      {type === 'loan' && (
        <Typo.Contents emphasize color={'primary'}>
          대출정보를 보고 연락했다고 하시면 대출이 더욱 쉬워집니다!
        </Typo.Contents>
      )}
      <Row width={'fill'} gap={16}>
        <Typo.Title emphasize width={'fill'} textOverflowLine={2}>
          {title.map((v, i) => (
            v.type === 'primary' ? (
              <span
                key={i}
                className={semantic.onGenericOnGenericPrimary}
              >
                {v.contents}
              </span>
            ) : (v.contents)
          ))}
        </Typo.Title>
        {type === 'loan' && (
          <BaseButton
            className={button.grayButton44}
            onClick={() => console.log('modal')}
          >
            <Typo.Contents>
              대출 시 주의사항 보기
            </Typo.Contents>
          </BaseButton>
        )}
      </Row>
    </Section>
  );
}
