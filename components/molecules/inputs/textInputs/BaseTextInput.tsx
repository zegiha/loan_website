'use client';

import {ChangeEvent, useRef, useState} from "react";
import style from './baseTextInput.module.scss';
import {semantic} from "@/shared/color";

interface IBaseTextInput {
  width?: 'fill' | number;
  height?: number;
  maxWidth?: number;
  placeholder: string;
  PlaceholderIcon?: React.ReactNode;
  TypingIcon?: React.ReactNode;
  SelectType?: React.ReactNode;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  size: 'normal' | 'big';
  name?: string
  value: string;
  onChangeAction: (value: string) => void;
  onClick?: () => void;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
}

export default function BaseTextInput({
  width,
  height,
  maxWidth,
  placeholder,
  PlaceholderIcon,
  TypingIcon,
  SelectType,
  inputType='text',
  size='normal',
  name,
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
        height: height && height,
      }}
      className={`
        ${size === 'normal' ? style.container36 : style.container48}
        ${isActive && style.activeContainer}
      `}
      onClick={() => inputRef.current?.focus()}
    >
      {PlaceholderIcon && PlaceholderIcon}
      {SelectType && <>
        {SelectType}
        <div className={semantic.outlineDefault} style={{width: 1, height: 20}}/>
      </>}
      {inputType !== 'textarea' ? (
        <input
          ref={inputRef}
          name={name}
          type={inputType}
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeAction(e.target.value)
          }}
          onClick={() => onClick}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      ) : (
        <textarea
          name={name}
          className={style.input}
          style={{height: '100%'}}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onChangeAction(e.target.value)
          }}
          onClick={() => onClick}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      )}
      {TypingIcon && value !== '' && TypingIcon}
    </div>
  );
}
