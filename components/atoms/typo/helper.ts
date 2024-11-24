import {TColor, TTextSize, TTextWidth} from "@/components/atoms/typo/type";
import semantic from "@/shared/color/semanticPalette.module.scss";
import {CSSProperties} from "react";

export function getElementType(textSize: TTextSize): string {
  switch (textSize) {
    case 'display': return 'h1';
    case 'header': return 'h1';
    case 'title': return 'h2';
    case 'body': return 'h3';
    default: return 'p';
  }
}

export function getFontSize(textSize: TTextSize, emphasize: boolean): string {
  switch (textSize) {
    case 'display': return `44px`;
    case 'header': return `${emphasize ? 29 : 28}px`;
    case 'title': return `${emphasize ? 25 : 24}px`;
    case 'body': return `${emphasize ? 19 : 18}px`;
    case 'subBody': return `${emphasize ? 17 : 16}px`;
    case 'contents': return `${emphasize ? 15 : 14}px`;
    case 'caption': return `${emphasize ? 13 : 12}px`;
  }
}

export function getWidthByStyle(width: TTextWidth | undefined): CSSProperties {
  if(width === undefined) return {width: 'auto'};
  switch (width) {
    case 'fill': return {
      flex: '1 0 0',
    };
    case 'hug': return {width: 'max-content'};
    default: return {width: `${width}px`};
  }
}

export function getColorClass(color: TColor): string {
  switch (color) {
    case 'variable': return semantic.onGenericOnGenericVariable;
    case 'generic': return semantic.onGenericOnGeneric;
    case 'dim': return semantic.onGenericOnGenericDim;
    case 'primary': return semantic.onGenericOnGenericPrimary;
    default: return '';
  }
}
