import {createElement} from "react";
import {getElementType, getFontSize, getWidth} from "@/components/atom/typo/helper";
import {IBaseTypo} from "@/components/atom/typo/type";



export default function BaseTypo({
  textSize,
  emphasize,
  children,
  width='hug',
  textOverflowLine,
  textAlign,
  className,
}:IBaseTypo) {
  return createElement(
    getElementType(textSize),
    {
      style: {
        fontSize: getFontSize(textSize, !!emphasize),
        lineHeight: '145%',
        fontWeight: emphasize ? 600 : 400,
        width: getWidth(width),
        lineClamp: textOverflowLine,
        textOverflow: !!textOverflowLine,
        textAlign: textAlign,
      },
      className,
    },
    children,
  );
}
