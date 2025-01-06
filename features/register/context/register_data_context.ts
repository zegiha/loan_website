import React, {createContext, useContext} from "react";

export interface IRegister_data {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>

  brokerage_number: string
  setBrokerage_number: React.Dispatch<React.SetStateAction<string>>
  brokerage_period: string
  setBrokerage_period: React.Dispatch<React.SetStateAction<string>>
  brokerage_registrar: string
  setBrokerage_registrar: React.Dispatch<React.SetStateAction<string>>
  brokerage_registration_certificate: File | null
  setBrokerage_registration_certificate: React.Dispatch<React.SetStateAction<File | null>>

  company_name: string
  setCompany_name: React.Dispatch<React.SetStateAction<string>>
  company_phone: string
  setCompany_phone: React.Dispatch<React.SetStateAction<string>>
  company_location: string
  setCompany_location: React.Dispatch<React.SetStateAction<string>>
}

const Register_data_context = createContext<null | IRegister_data>(null)

function useRegister_data() {
  const context = useContext(Register_data_context);
  if(context === null) {
    throw new Error('useRegister_context')
  }
  return context
}

export {
  Register_data_context,
  useRegister_data
}
