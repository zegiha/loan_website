import {CSSProperties} from "react";

export type flexDir =
  'row' |
  'col';

export type  justifyContents =
  'start' |
  'center' |
  'end' |
  'space-between';

export type alignItems =
  'start' |
  'center' |
  'end';

export type width = 'fill' | number;

export interface IRowAndCol {
  justifyContents?: justifyContents;
  alignItems?: alignItems;
  wrap?: boolean;
  gap?: number;
  className?: string;
  width?: width;
  style?: CSSProperties;
  children: React.ReactNode;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  onClick?: (e?: MouseEvent) => void;
}

export interface IFlex extends IRowAndCol {
  flexDir: flexDir;
}
