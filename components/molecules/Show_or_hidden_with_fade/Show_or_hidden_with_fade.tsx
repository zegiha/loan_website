'use client'

import style from "./style.module.scss";
import {Col} from "@/components/atoms/layout";

export default function Show_or_hidden_with_fade({
  is_active,
  children
}: {
  is_active: boolean,
  children: React.ReactNode
}) {
  const handle_active = (is_active: boolean) => {
    return is_active ?
      style.show_component:
      style.hide_component
  }
  return (
    <Col width={'fill'} className={handle_active(is_active)}>
      {children}
    </Col>
  )
}
