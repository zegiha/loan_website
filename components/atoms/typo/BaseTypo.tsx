import {createElement} from "react";
import {getColorClass, getElementType, getFontSize, getWidthByStyle} from "@/components/atoms/typo/helper";
import {IBaseTypo} from "@/components/atoms/typo/type";
import style from './typo.module.scss';

export default function BaseTypo({
  textSize,
  isPre,
  emphasize,
  children,
  width,
  textOverflowLine,
  textAlign,
  color='generic',
  userSelect='none',
  className,
}:IBaseTypo) {
  return createElement(
    isPre ? 'pre' : getElementType(textSize),
    {
      style: {
        fontSize: getFontSize(textSize, !!emphasize),
        lineHeight: '145%',
        fontWeight: emphasize ? 600 : 400,
        textAlign: textAlign,
        justifyContent: textAlign,
        wordBreak: 'keep-all',
        userSelect: userSelect,
        ...getWidthByStyle(width),
        whiteSpace: isPre ? 'pre-wrap' : undefined,
      },
      className: `
      ${className}
      ${style.textTransision}
      ${getColorClass(color)}
      ${textOverflowLine === 1 ?
        style.overflowLine1 :
        textOverflowLine === 2 ?
          style.overflowLine2 : ''}
      `,
    },
    children,
  );
}
