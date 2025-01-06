'use client'

import {createContext, ReactNode, useContext} from "react";

interface IBanner_info_context {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  contents: string
  setContents: React.Dispatch<React.SetStateAction<string>>
}

export const Banner_info_context = createContext<IBanner_info_context | null>(null);

export function use_banner_info_context() {
  const data = useContext(Banner_info_context);
  if(data === null) {
    throw new Error('초기 값 없이 banner_info_context 사용')
  }
  return data;
}
