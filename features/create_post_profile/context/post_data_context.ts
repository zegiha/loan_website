import React, {createContext, useContext} from "react";

export interface IPost_data {
  gender: 'MALE' | 'FEMALE'
  setGender: React.Dispatch<React.SetStateAction<'MALE' | 'FEMALE'>>
  age: string
  setAge: React.Dispatch<React.SetStateAction<string>>
  phone_number: string
  setPhone_number: React.Dispatch<React.SetStateAction<string>>
  has_job: boolean
  setHas_job: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  contents: string
  setContents: React.Dispatch<React.SetStateAction<string>>
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  monthly_income: string | null
  set_monthly_income: React.Dispatch<React.SetStateAction<string | null>>
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
