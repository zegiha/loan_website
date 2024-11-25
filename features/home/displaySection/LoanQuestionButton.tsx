'use client'

import {BaseButton} from "@/components/molecules/inputs";
import {semantic} from "@/shared/color";
import style from "@/features/home/displaySection/display.module.scss";
import Typo from "@/components/atoms/typo/Typo";

export default function LoanQuestionButton() {
  return (
    <BaseButton
      onClick={() => console.log('홈에 지금 대출 문의하기 눌림')}
      className={style.loanQuestionButton}
    >
      <Typo.Title emphasize className={semantic.primaryOnPrimary}>
        지금 대출 문의하기
      </Typo.Title>
    </BaseButton>
  );
}
