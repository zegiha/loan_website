'use client'

import {
  ISlide_nav, Section,
  Show_or_hidden_with_fade,
  Show_or_hidden_with_fade_container,
  Slide_nav
} from "@/components/molecules";
import {useEffect, useState} from "react";
import {Col} from "@/components/atoms/layout";
import Guide_user from "@/features/guide/user/ui/Guide_user";
import {useRouter} from "next/navigation";

interface ISlide_nav_new extends ISlide_nav {
  separator: 'user' | 'company' | 'introduce'
}

const slide_nav: Array<ISlide_nav_new> = [
  {name: '일반 고객', separator: 'user'},
  {name: '업체', separator: 'company'},
  {name: '회사소개', separator: 'introduce'},
]

export default function Guide_page() {
  const [active, set_active] = useState<ISlide_nav_new['separator']>('user')
  const router = useRouter()
  useEffect(() => {
    if(active === 'company') {
      router.push('/customer/ads')
    }
  }, [active])
  return (
    <Section backgroundColor={'surface'}>
      <Col width={'fill'} gap={24}>
        <Slide_nav nav_data={slide_nav} active={active} set_active_action={set_active}/>
        <Show_or_hidden_with_fade_container>
          <Show_or_hidden_with_fade is_active={active === 'user'}>
            <Guide_user/>
          </Show_or_hidden_with_fade>
          <Show_or_hidden_with_fade is_active={active === 'introduce'}>
            introduce
          </Show_or_hidden_with_fade>
        </Show_or_hidden_with_fade_container>
      </Col>
    </Section>
  )
}
