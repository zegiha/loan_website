'use client'

import React, {createContext, useContext} from "react";
interface TSelect_context {
  select: Array<string>
  setSelect: React.Dispatch<React.SetStateAction<Array<string>>>
}

export const Select_context = createContext<TSelect_context | null>(null)

export function useSelect_context() {
  const data = useContext(Select_context);
  if(data === null) {
    throw new Error('초기 값 없이 select_context 사용')
  }
  return data;
}
