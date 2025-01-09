'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {useState} from "react";
import User_faq from "@/features/customer/faq/ui/User_faq";
import Company_faq from "@/features/customer/faq/ui/Company_faq";
import {
  ISlide_nav,
  Show_or_hidden_with_fade,
  Show_or_hidden_with_fade_container,
  Slide_nav
} from "@/components/molecules";

const nav_data: Array<ISlide_nav> = [
  {name: '일반고객', separator: 'user'},
  {name: '대출 업체', separator: 'company'},
]

export default function Faq_contents() {
  const [active, set_active] = useState<typeof nav_data[number]['separator']>('user');

  return (
    <Col gap={16} width={'fill'}>
      <Typo.Body emphasize color={'variable'}>
        자주 묻는 질문
      </Typo.Body>
      <Slide_nav nav_data={nav_data} active={active} set_active_action={set_active}/>
      <Show_or_hidden_with_fade_container>
        <Show_or_hidden_with_fade is_active={active === 'user'}>
          <User_faq/>
        </Show_or_hidden_with_fade>
        <Show_or_hidden_with_fade is_active={active === 'company'}>
          <Company_faq/>
        </Show_or_hidden_with_fade>
      </Show_or_hidden_with_fade_container>
    </Col>
  )
}
