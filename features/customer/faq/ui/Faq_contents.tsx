'use client'

import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {useState} from "react";
import Navigation from "@/features/customer/faq/ui/Navigation";
import style from './style.module.scss'
import User_faq from "@/features/customer/faq/ui/User_faq";
import Company_faq from "@/features/customer/faq/ui/Company_faq";

export default function Faq_contents() {
  const [active, set_active] = useState<'user' | 'company'>('user');

  const handle_active = (is_active: boolean) => {
    return is_active ?
      style.show_component:
      style.hide_component
  }

  return (
    <Col gap={16} width={'fill'}>
      <Typo.Body emphasize color={'variable'}>
        자주 묻는 질문
      </Typo.Body>
      <Navigation active={active} set_active={set_active}/>
      <Col width={'fill'} style={{position: 'relative'}}>
        <Col width={'fill'} className={handle_active(active === 'user')}>
          <User_faq/>
        </Col>
        <Col width={'fill'} className={handle_active(active === 'company')}>
          <Company_faq/>
        </Col>
      </Col>
    </Col>
  )
}
