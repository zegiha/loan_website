'use client'
import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {PremiumBanner} from "@/components/organisms";
import {semantic} from "@/shared/color";
import style from './premiumBannerAndCategories.module.scss';
import {BaseTextInput} from "@/components/molecules/inputs";
import {useState} from "react";
import CloseIcon from "@/components/atoms/icons/CloseIcon";
import CategoryToggleButton from "@/components/molecules/inputs/buttons/categoryToggleButton/CategoryToggleButton";

export default function PremiumBannerAndCategories() {
  const [locationSearch, setLocationSearch] = useState<string>('');
  const [test, setTest] = useState(false)

  return (
    <Section>
      <Row gap={24} width={'fill'}>
        <Col gap={24} className={style.smallBox}>
          <Typo.SubBody color={'variable'} emphasize>
            <span className={semantic.onGenericOnGenericPrimary}>
              프리미엄
            </span>
            대부업체
          </Typo.SubBody>
          <PremiumBanner defaultCardNumber={1}/>
        </Col>
        <Col gap={16} className={style.bigBox}>
          <BaseTextInput
            placeholder={'찾으시는 지역을 입력해주세요'}
            size={'normal'}
            width={'fill'}
            maxWidth={280}
            value={locationSearch}
            TypingIcon={
            <div
              style={{
              width: 20, height: 20,
              cursor: 'pointer',
              }}
              onClick={() => setLocationSearch('')}
            >
              <CloseIcon size={20} color={'dim'}/>
            </div>
            }
            onChangeAction={(e) => {
              setLocationSearch(e.target.value);
            }}
          />
          <Row width={'fill'} gap={12} wrap>
            <CategoryToggleButton
              onClick={() => setTest(prev => !prev)}
              active={test}
              contents={'jaja'}
              subContents={'jojo 딴따 따라라라랄라랄'}
            />
          </Row>
        </Col>
      </Row>
    </Section>
  );
}
