import {CSSProperties} from "react";
import {semantic} from "@/shared/color";

type color = 'dim' | 'normal' | 'variable' | 'primary';
interface IBaseIcon extends IIcon{
  iconKey: string;
}
export interface IIcon {
  color?: color;
  size?: number;
  fill?: boolean;
  deg?: number;
}

export default function BaseIcon({
  iconKey,
  color = 'normal',
  size = 24,
  fill=true,
  deg=0,
}: IBaseIcon) {
  const style: CSSProperties = {
    fontSize: size,
    fontVariationSettings: `'FILL' ${fill ? '1' : '0'}, 'wght' 300`,
    transform: `rotate(${deg}deg)`,
  }
  return (
    <div
      className={`material-symbols-rounded ${getColor(color)}`}
      style={style}
    >
      {iconKey}
    </div>
  );
}

function getColor(color: color): string {
  switch (color) {
    case 'primary': return semantic.onGenericOnGenericPrimary;
    case 'variable': return semantic.onGenericOnGenericVariable;
    case 'normal': return semantic.onGenericOnGeneric;
    default: return semantic.onGenericOnGenericDim;
  }
}
