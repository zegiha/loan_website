import {createElement} from "react";
import {getColorClass, getElementType, getFontSize, getWidth} from "@/components/atoms/typo/helper";
import {IBaseTypo} from "@/components/atoms/typo/type";



export default function BaseTypo({
  textSize,
  emphasize,
  children,
  width,
  textOverflowLine,
  textAlign,
  color='generic',
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
        wordBreak: 'keep-all',
      },
      className: `${className} ${getColorClass(color)}`,
    },
    children,
  );
}
