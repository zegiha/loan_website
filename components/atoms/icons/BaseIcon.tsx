import {CSSProperties} from "react"
import {semantic_object} from "@/shared/color";
import transitionStyle from './baseIcon.module.scss';

type color = 'dim' | 'normal' | 'variable' | 'primary' | 'none' | 'white' | 'red';
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
    color: color === 'none' ? 'transparent' : getColor(color),
    userSelect: 'none',
    width: size,
    height: size,
  }
  return (
    <div
      className={`material-symbols-rounded ${transitionStyle.transition}`}
      style={style}
    >
      {iconKey}
    </div>
  );
}

function getColor(color: color): string {
  switch (color) {
    case 'primary': return semantic_object.onGeneric.onGenericPrimary;
    case 'variable': return semantic_object.onGeneric.onGenericVariable;
    case 'normal': return semantic_object.onGeneric.onGeneric;
    case 'white': return semantic_object.primary.onPrimary;
    case 'red': return semantic_object.errorContainer.onErrorContainer;
    default: return semantic_object.onGeneric.onGenericDim;
  }
}
