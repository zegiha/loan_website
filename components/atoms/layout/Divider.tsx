import {semantic_object} from "@/shared/color";
import {CSSProperties} from "react";

export default function Divider({height, color}: {height?: number | 'fill', color?: 'outline' | 'surface_dim'}) {
  const style: CSSProperties = {
    width: '100%',
    height: height ? height === 'fill' ? '100%' : `${height}px` : '1px',
    backgroundColor:
      color ? color === 'outline' ? semantic_object.outline.default : semantic_object.surface.surfaceDim :
        height ? semantic_object.surface.surfaceDim : semantic_object.outline.default,
  }
  return <div
    style={style}
  />
}
