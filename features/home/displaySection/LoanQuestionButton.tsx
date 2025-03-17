'use client'

import {BaseButton} from "@/components/molecules/inputs";
import style from "@/features/home/displaySection/display.module.scss";
import Typo from "@/components/atoms/typo/Typo";
import {useRouter} from "next/navigation";

export default function LoanQuestionButton() {
  const router = useRouter()
  return (
    <BaseButton
      onClick={() => router.push('/post/create')}
      className={style.loanQuestionButton}
    >
      <Typo.Body emphasize color={'onPrimary'}>
        지금 대출 문의하기
      </Typo.Body>
    </BaseButton>
  );
}
