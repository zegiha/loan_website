'use client'

import {Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import React, {useEffect, useRef} from "react";
import style from './style.module.scss'
import ISlide_nav from "@/components/molecules/Slide_nav/type";

export default function Slide_nav<T extends Array<ISlide_nav>>({
  active,
  set_active_action,
  nav_data,
}: {
  active: T[number]['separator'],
  set_active_action: React.Dispatch<React.SetStateAction<T[number]['separator']>>
  nav_data: T
}) {
  const active_item_ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(active_item_ref && active_item_ref.current) {
      const active_item = active_item_ref.current;

      for(let i = 0; i < nav_data.length; i++) {
        if(active === nav_data[i].separator) {
          active_item.style.transform = `translateX(calc((100% + 12px) * ${i}))`
        }
      }
    }
  }, [active]);

  useEffect(() => {
    if(active_item_ref && active_item_ref.current) {
      active_item_ref.current.style.width = `calc((100% - ${12 * nav_data.length}px) / ${nav_data.length})`;
    }
  }, [active_item_ref]);

  const handle_text_style = (is_active: boolean) => {
    return is_active ?
      style.navigation_item_text_active :
      style.navigation_item_text
  }

  return(
    <Row width={'fill'} gap={12} className={style.navigation_container}>
      {nav_data.map((v, i) => (
        <Row
          key={i}
          onClick={() => {set_active_action(v.separator)}}
          width={'fill'}
          justifyContents={'center'}
          alignItems={'center'}
          className={style.navigation_item}
        >
          <Typo.SubBody
            color={'dim'}
            emphasize={v.separator === active}
            className={handle_text_style(v.separator === active)}
          >
            {v.name}
          </Typo.SubBody>
        </Row>
      ))}
      <div className={style.navigation_item_active} ref={active_item_ref}/>
    </Row>
  )
}
