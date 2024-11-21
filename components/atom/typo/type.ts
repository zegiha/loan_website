export type TTextSize =
  'display' |
  'header' |
  'title' |
  'body' |
  'subBody' |
  'contents' |
  'caption';

export type TTextWidth =
  'fill' |
  'hug' |
  number;

export interface ITypo {
  children: string;
  emphasize?: boolean;
  width?: TTextWidth;
  textOverflowLine?: number;
  textAlign?: 'start' | 'center' | 'end';
  className?: string;
}

export interface IBaseTypo extends ITypo{
  textSize: TTextSize;
}
