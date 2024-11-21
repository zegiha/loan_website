import {TTextSize, TTextWidth} from "@/components/atom/typo/type";

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

export function getWidth(width: TTextWidth): string {
  switch (width) {
    case 'fill': return '100%';
    case 'hug': return 'auto';
    default: return `${width}px`;
  }
}
