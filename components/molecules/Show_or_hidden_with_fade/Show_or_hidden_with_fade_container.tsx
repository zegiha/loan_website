import {Col} from "@/components/atoms/layout";
import {ReactNode} from "react";

export default function Show_or_hidden_with_fade_container({
  children
}: {
  children: ReactNode
}) {
  return (
    <Col width={'fill'} style={{position: 'relative'}}>
      {children}
    </Col>
  )
}
