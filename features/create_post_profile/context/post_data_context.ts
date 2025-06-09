import React, {createContext, useContext} from "react";
import {TLocation} from "@/shared/type";

export type TJobStatus = '직장인' | '사업자' | '소상공인' | '프리랜서' | '무직';

export interface IPost_data {
  gender: 'MALE' | 'FEMALE'
  setGender: React.Dispatch<React.SetStateAction<'MALE' | 'FEMALE'>>
  age: string
  setAge: React.Dispatch<React.SetStateAction<string>>
  phone_number: string
  setPhone_number: React.Dispatch<React.SetStateAction<string>>
  job: TJobStatus
  setJob: React.Dispatch<React.SetStateAction<TJobStatus>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  contents: string
  setContents: React.Dispatch<React.SetStateAction<string>>
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  monthly_income: string | null
  set_monthly_income: React.Dispatch<React.SetStateAction<string | null>>
  location: Exclude<TLocation, '전체'> | null
  set_location: React.Dispatch<React.SetStateAction<Exclude<TLocation, '전체'> | null>>
  loan_type: '신용' | '담보' | null
  set_loan_type: React.Dispatch<React.SetStateAction<'신용' | '담보' | null>>
}

const Post_data_context = createContext<null | IPost_data>(null)

function usePost_data() {
  const context = useContext(Post_data_context)
  if(context == null) {
    throw new Error('usePost_context')
  }
  return context
}

export {
  Post_data_context,
  usePost_data
};
