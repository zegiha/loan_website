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

export type TColor =
  'generic' |
  'variable' |
  'dim' |
  'primary' |
  'onPrimary' |
  'onPrimaryDim' |
  undefined;

export interface ITypo {
  children: string | React.ReactNode;
  isPre?: boolean;
  emphasize?: boolean;
  width?: TTextWidth;
  textOverflowLine?: number;
  color?: TColor,
  textAlign?: 'start' | 'center' | 'end';
  userSelect?: 'none' | 'auto';
  className?: string;
}

export interface IBaseTypo extends ITypo{
  textSize: TTextSize;
}
