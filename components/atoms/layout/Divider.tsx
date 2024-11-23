import {semantic} from "@/shared/color";

export default function Divider({height}: {height?: number}) {
  return <div
    style={{width: '100%', height: height ? `${height}px` : '1px'}}
    className={`${semantic.outlineDefault}`}
  />
}
