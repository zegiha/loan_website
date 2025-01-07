'use client';

import {ChangeEvent, useRef, useState} from "react";
import style from './baseTextInput.module.scss';
import {semantic} from "@/shared/color";
import Typo from "@/components/atoms/typo/Typo";

interface IBaseTextInput {
  width?: 'fill' | number;
  height?: number;
  maxWidth?: number;
  placeholder?: string;
  PlaceholderIcon?: React.ReactNode;
  TypingIcon?: React.ReactNode;
  SelectType?: React.ReactNode;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date' | 'file'
  size: 'normal' | 'big';
  name?: string
  value: string;
  onChangeAction: (value: string) => void;
  onClick?: () => void;
  checkError?: Array<(input_value: string) => string | null>;
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
  checkError,
}: IBaseTextInput) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div
      style={{
        width: width === 'fill' ?
          '100%' : width === undefined ?
            'auto' : `${width}px`,
        maxWidth: maxWidth && `${maxWidth}px`,
        height: height && height,
        position: 'relative',
      }}
      className={`
        ${size === 'normal' ? style.container36 : style.container48}
        ${error !== null ? style.error_container : ''}
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
          className={inputType === 'date' ? style.input_date : style.input}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeAction(e.target.value)
            error !== null && checkError && checkError.some(check => {
              const new_error = check(value)
              setError(new_error)
              return typeof new_error === 'string'
            })
          }}
          onClick={() => onClick}
          onFocus={() => setIsActive(true)}
          onBlur={() => {
            setIsActive(false)
            checkError && checkError.some((check) => {
              const new_error = check(value);
              setError(new_error)
              return typeof new_error === 'string'
            })
          }}
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
      {error && (
        <Typo.Caption className={style.error_text}>
          {error}
        </Typo.Caption>
      )}
    </div>
  );
}
