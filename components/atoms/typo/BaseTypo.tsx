import {createElement} from "react";
import {get_color, getElementType, getFontSize, getWidthByStyle} from "@/components/atoms/typo/helper";
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
  underline,
  className,
  onClick
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
        wordBreak: 'break-word',
        userSelect: userSelect,
        ...getWidthByStyle(width),
        whiteSpace: isPre === undefined ? undefined : typeof isPre === "boolean" || isPre === 'wrap' ? 'pre-wrap' : 'pre',
        textDecoration: underline ? 'underline' : undefined,
        cursor: onClick !== undefined ? 'pointer' : undefined
      },
      className: `
      ${className}
      ${style.textTransision}
      ${get_color(color)}
      ${textOverflowLine === 1 ?
        style.overflowLine1 :
        textOverflowLine === 2 ?
          style.overflowLine2 : ''}
      `,
      onClick,
    },
    children,
  );
}
