'use client'

import {Section} from "@/components/molecules";
import {BaseButton} from "@/components/molecules/inputs";
import {Row} from "@/components/atoms/layout";
import {ArrowIcon} from "@/components/atoms/icons";
import Typo from "@/components/atoms/typo/Typo";
import {useRouter} from "next/navigation";
import style from './style.module.scss';
import {semantic_object} from "@/shared/color";

interface IAnnouncement_detail_title {
  title: string;
  createdAt: Date;
}

export default function Title_section({
  title,
  createdAt,
}: IAnnouncement_detail_title) {
  const router = useRouter()

  return (
    <Section backgroundColor={'surface'}>
      <BaseButton
        className={style.backButtonContainer}
        onClick={() => router.back()}
      >
        <Row gap={12} alignItems={'center'}>
          <ArrowIcon color={'dim'} deg={180}/>
          <Typo.SubBody color={'dim'}>돌아가기</Typo.SubBody>
        </Row>
      </BaseButton>
      <Typo.Title emphasize color={'variable'} textOverflowLine={2}>
        {title}
      </Typo.Title>
      <Row width={'fill'} wrap gap={12} alignItems={'center'}>
        <Typo.SubBody color={'dim'}>
          {`${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`} 등록
        </Typo.SubBody>
      </Row>
    </Section>
  );
}
