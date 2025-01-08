import {Row} from "@/components/atoms/layout";
import style from "@/features/customer/faq/ui/style.module.scss";
import Typo from "@/components/atoms/typo/Typo";
import React, {useEffect, useRef} from "react";

export default function Navigation({
  active,
  set_active
}: {
  active: 'user' | 'company',
  set_active: React.Dispatch<React.SetStateAction<'user' | 'company'>>
}) {
  const active_item_ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(active_item_ref && active_item_ref.current) {
      const active_item = active_item_ref.current;
      if(active === 'user') {
        active_item.style.transform = `translateX(0)`;
      } else {
        active_item.style.transform = `translateX(calc(100% + 12px))`;
      }
    }
  }, [active]);

  const handle_text_style = (is_active: boolean) => {
    return is_active ?
      style.navigation_item_text_active :
      style.navigation_item_text
  }

  return(
    <Row width={'fill'} gap={12} className={style.navigation_container}>
      <Row
        onClick={() => {set_active('user')}}
        width={'fill'}
        justifyContents={'center'}
        alignItems={'center'}
        className={style.navigation_item}
      >
        <Typo.SubBody
          color={'dim'}
          emphasize={'user' === active}
          className={handle_text_style('user' === active)}
        >
          일반고객
        </Typo.SubBody>
      </Row>
      <Row
        onClick={() => {set_active('company')}}
        width={'fill'}
        justifyContents={'center'}
        alignItems={'center'}
        className={style.navigation_item}
      >
        <Typo.SubBody
          color={'dim'}
          emphasize={'company' === active}
          className={handle_text_style('company' === active)}
        >
          대출업체
        </Typo.SubBody>
      </Row>
      <div className={style.navigation_item_active} ref={active_item_ref}/>
    </Row>
  )
}
