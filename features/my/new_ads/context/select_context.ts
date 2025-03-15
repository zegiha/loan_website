'use client'

import React, {createContext, useContext} from "react";
import {TAds_name, TAds_type} from "@/shared/type";
interface TSelect_context {
  select: Array<{type_name: TAds_type, name: TAds_name, price: number}>
  setSelect: React.Dispatch<React.SetStateAction<Array<{type_name: TAds_type, name: TAds_name, price: number}>>>
}

export const Select_context = createContext<TSelect_context | null>(null)

export function useSelect_context() {
  const data = useContext(Select_context);
  if(data === null) {
    throw new Error('초기 값 없이 select_context 사용')
  }
  return data;
}
