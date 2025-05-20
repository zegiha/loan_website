'use client'

import {useRegister_data} from "@/features/register/context/register_data_context";
import {useAuthControllerRegister} from "@/entities/api/auth/auth";
import {UserRegisterDto} from "@/entities/const";
import {location_list} from "@/shared/constants";
import {uploadControllerUploadFile} from "@/entities/api/upload/upload";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {error_checker, is_correct_id, is_correct_password, is_correct_phone_number, is_typed} from "@/shared/helper";

export default function useRegister() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'pending'>('idle')
  const data = useRegister_data()

  const registerMutation = useAuthControllerRegister()

  useEffect(() => {
    if(registerMutation.status !== status && registerMutation.status !== 'idle') {
      setStatus(registerMutation.status)
    }
  }, [registerMutation.status])

  useEffect(() => {
    if(status === 'success') {
      window.scrollTo({top: 0})
      router.replace('/login')
    }
    if(status === 'error') {
      alert('다시 시도해주세요')
    }
  }, [status]);

  const getRegisterDto: () => Promise<UserRegisterDto> = async () => {
    try {
      const formatDate = (v: Date) => {
        return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}`
      }

      Object.entries(data).forEach(([key, value]) => {
        if(value === null || value === undefined) {
          throw new Error(`${key} cannot be empty`)
        }
      })

      const loanRegistrationCertificate =
        await uploadControllerUploadFile({
          file: data.brokerage_registration_certificate!,
        }).then(res => {
          if(res === undefined) throw new Error('img upload failed')
          return res.url
        })
      const businessRegistrationCertificate =
        await uploadControllerUploadFile({
          file: data.business_registration_certificate!,
        }).then(res => {
          if(res === undefined) throw new Error('img upload failed')
          return res.url
        })

      return {
        id: data.id,
        password: data.password,
        tel: data.phone.replaceAll('-', ''),
        advertisementTel: data.loan_advertisement_phone.replaceAll('-', ''),
        companyTel: data.company_phone.replaceAll('-', ''),
        registeredNumber: data.brokerage_number,
        registerPeriodStart: formatDate(data.brokerage_period.start!),
        registerPeriodEnd: formatDate(data.brokerage_period.end!),
        registrar: data.brokerage_registrar,
        loanRegistrationCertificate: loanRegistrationCertificate!,
        businessRegistrationCertificate: businessRegistrationCertificate!,
        companyName: data.company_name,
        companyLocation: data.company_location,
        exponentName: data.exponent_name,
        company: {
          title: data.title,
          contents: data.contents,
          monthlyInterestRate: data.monthly_interest_rate,
          yearlyInterestRate: data.yearly_interest_rate,
          delinquentInterestRate: data.delinquent_interest_rate,
          loanLimit: Number(data.loan_limit) ?? 0,
          additionalCost: data.additional_cost,
          earlyRepaymentFee: data.early_repayment_fee,
          repaymentMethod: data.repayment_method,
          loanPeriod: data.loan_period,
          // TODO 대출 가능 지역 여러개로 수정
          location: [location_list[Number(data.available_location)]]
        }
      }
    } catch (e) {
      console.error('state에서 dto로 변환 에러')
      return Promise.reject(e)
    }
  }

  const validate = () => {
    if(
      is_correct_id(data.id) === null &&
      is_correct_password(data.password) === null &&
      is_correct_phone_number(data.phone) === null &&
      is_typed(data.exponent_name) === null
    ) {
      alert('잘못된 입력이 있습니다')
      data.setStep(0)
    }
    else if(
      error_checker([is_typed], data.brokerage_number) === null &&
      error_checker([is_correct_phone_number], data.loan_advertisement_phone) === null &&
      error_checker([is_typed], data.brokerage_period.start?.toString()) === null &&
      error_checker([is_typed], data.brokerage_period.end?.toString()) === null &&
      error_checker([is_typed], data.brokerage_registrar) === null &&
      data.brokerage_registration_certificate !== null &&
      data.business_registration_certificate !== null
    ) {
      alert('잘못된 입력이 있습니다')
      data.setStep(1)
    }
    else if(
      error_checker([is_typed], data.company_name) === null &&
      error_checker([is_typed, is_correct_phone_number], data.company_phone) === null &&
      error_checker([is_typed], data.company_location) === null
    ) {
      alert('잘못된 입력이 있습니다')
      data.setStep(2)
    } else {
      alert('잘못된 입력이 있습니다')
    }
  }

  const handleRegister = async () => {
    try {
      setStatus('pending')
      const data = await getRegisterDto()
      registerMutation.mutate({data})
    } catch (e) {
      if(e instanceof AxiosError) {
        if(e.status === 401) {
          validate()
          return
        }
      }
      alert('문제가 발생했습니다 다시 시도해주세요')
      console.error('handleRegister 에러')
    }
  }

  return {
    status,
    handleRegister
  }
}
