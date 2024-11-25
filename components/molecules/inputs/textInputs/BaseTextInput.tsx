'use client';

import {ChangeEvent, useRef, useState} from "react";
import style from './baseTextInput.module.scss';

interface IBaseTextInput {
  width?: 'fill' | number;
  maxWidth?: number;
  placeholder: string;
  PlaceholderIcon?: React.ReactNode;
  TypingIcon?: React.ReactNode;
  selectType?: Array<{active: boolean, contents: string}>;
  size: 'normal' | 'big';
  value: string;
  onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
}

export default function BaseTextInput({
  width,
  maxWidth,
  placeholder,
  PlaceholderIcon,
  TypingIcon,
  selectType,
  size='normal',
  value,
  onChangeAction,
  onClick,
}: IBaseTextInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div
      style={{
        width: width === 'fill' ?
          '100%' : width === undefined ?
            'auto' : `${width}px`,
        maxWidth: maxWidth && `${maxWidth}px`,
      }}
      className={`
        ${size === 'normal' ? style.container36 : style.container48}
        ${isActive && style.activeContainer}
      `}
      onClick={() => inputRef.current?.focus()}
    >
      {PlaceholderIcon && (
        <div key={`${isActive}`} style={{height: 24}} className={
          isActive ? style.hidePlaceholderIcon : style.placeholderIcon
        }>
          {PlaceholderIcon}
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        className={style.input}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {onChangeAction(e)}}
        onClick={() => onClick}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      {TypingIcon && isActive && TypingIcon}
    </div>
  );
}
