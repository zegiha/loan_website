import {semantic} from "@/shared/color";

export default function Divider({height, color}: {height?: number | 'fill', color?: 'outline' | 'surface_dim'}) {
  return <div
    style={{width: '100%', height: height ?
        height === 'fill' ? '100%' :
          `${height}px` : '1px'}}
    className={`${color ?
      color === 'outline' ? semantic.outlineDefault : semantic.surfaceSurfaceDim :
      height ? semantic.surfaceSurfaceDim : semantic.outlineDefault}`}
  />
}
