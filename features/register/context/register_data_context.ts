'use client'

import react_state_action from '@/shared/type/react_state_action'
import React, {createContext, useContext} from "react";

export interface IRegister_data {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  exponent_name: string
  set_exponent_name: React.Dispatch<React.SetStateAction<string>>
  // nickname: string
  // set_nickname: React.Dispatch<React.SetStateAction<string>>

  brokerage_number: string
  setBrokerage_number: React.Dispatch<React.SetStateAction<string>>
  loan_advertisement_phone: string
  set_loan_advertisement_phone: React.Dispatch<React.SetStateAction<string>>
  brokerage_period: {start: Date | null, end: Date | null}
  setBrokerage_period: React.Dispatch<React.SetStateAction<{start: Date | null, end: Date | null}>>
  brokerage_registrar: string
  setBrokerage_registrar: React.Dispatch<React.SetStateAction<string>>
  brokerage_registration_certificate: File | null
  setBrokerage_registration_certificate: React.Dispatch<React.SetStateAction<File | null>>
  business_registration_certificate: File | null
  set_business_registration_certificate: React.Dispatch<React.SetStateAction<File | null>>

  company_name: string
  setCompany_name: React.Dispatch<React.SetStateAction<string>>
  company_phone: string
  setCompany_phone: React.Dispatch<React.SetStateAction<string>>
  company_location: string
  setCompany_location: React.Dispatch<React.SetStateAction<string>>

	monthly_interest_rate: string
  set_monthly_interest_rate: react_state_action<string>
	yearly_interest_rate: string
  set_yearly_interest_rate: react_state_action<string>
	delinquent_interest_rate: string;
  set_delinquent_interest_rate: react_state_action<string>
	loan_limit: string;
  set_loan_limit: react_state_action<string>
	additional_cost: string;
  set_additional_cost: react_state_action<string>
	early_repayment_fee: string;
  set_early_repayment_fee: react_state_action<string>
	repayment_method: string;
  set_repayment_method: react_state_action<string>
	loan_period: string;
  set_loan_period: react_state_action<string>
	available_location: string;
  set_available_location: react_state_action<string>
  title: string,
  set_title: react_state_action<string>
	contents: string;
  set_contents: react_state_action<string>

  step: number
  setStep: react_state_action<number>
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
  useRegister_data,
}
