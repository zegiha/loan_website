'use client'

import Register_company_page_info from '@/features/register/ui/Register_company_page_info'
import {useEffect, useState} from "react";
import {IRegister_data, Register_data_context} from "@/features/register/context/register_data_context";
import {useRouter} from "next/navigation";
import Register_generic_user_info from "@/features/register/ui/Register_generic_user_info";
import Register_company_info from "@/features/register/ui/Register_company_info";
import Register_brokerage_info from "@/features/register/ui/Register_brokerage_info";
import {ReCaptchaProvider, useReCaptcha} from "next-recaptcha-v3";
import {test_captcha} from "@/shared/api/recaptcha";

export default function Register_page() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [exponent_name, set_exponent_name] = useState<string>('');
  // const [nickname, set_nickname] = useState<string>('');

  const [brokerage_number, setBrokerage_number] = useState<string>('');
  const [loan_advertisement_phone, set_loan_advertisement_phone] = useState<string>('');
  const [brokerage_period, setBrokerage_period] = useState<{start: Date | null, end: Date | null}>({start: null, end: null});
  const [brokerage_registrar, setBrokerage_registrar] = useState<string>('');
  const [brokerage_registration_certificate, setBrokerage_registration_certificate] = useState<File | null>(null);
  const [business_registration_certificate, set_business_registration_certificate] = useState<File | null>(null);

  const [company_name, setCompany_name] = useState<string>('');
  const [company_phone, setCompany_phone] = useState<string>('');
  const [company_location, setCompany_location] = useState<string>('');

  const [monthly_interest_rate, set_monthly_interest_rate] = useState<string>('');
  const [yearly_interest_rate, set_yearly_interest_rate] = useState<string>('');
  const [delinquent_interest_rate, set_delinquent_interest_rate] = useState<string>('');
  const [loan_limit, set_loan_limit] = useState<string>('');
  const [additional_cost, set_additional_cost] = useState<string>('');
  const [early_repayment_fee, set_early_repayment_fee] = useState<string>('');
  const [repayment_method, set_repayment_method] = useState<string>('');
  const [loan_period, set_loan_period] = useState<string>('');
  const [available_location, set_available_location] = useState<string>('');
  const [title, set_title] = useState<string>('')
  const [contents, set_contents] = useState<string>('');

  const [step, setStep] = useState<number>(0)

  const default_value: IRegister_data = {
    step, setStep,
    id, setId,
    password, setPassword,
    phone, setPhone,
    exponent_name, set_exponent_name,
    // nickname, set_nickname,
    company_name, setCompany_name,
    company_phone, setCompany_phone,
    company_location, setCompany_location,
    brokerage_number, setBrokerage_number,
    loan_advertisement_phone, set_loan_advertisement_phone,
    brokerage_period, setBrokerage_period,
    brokerage_registrar, setBrokerage_registrar,
    brokerage_registration_certificate, setBrokerage_registration_certificate,
    business_registration_certificate, set_business_registration_certificate,
    monthly_interest_rate, set_monthly_interest_rate,
    yearly_interest_rate, set_yearly_interest_rate,
    delinquent_interest_rate, set_delinquent_interest_rate,
    loan_limit, set_loan_limit,
    additional_cost, set_additional_cost,
    early_repayment_fee, set_early_repayment_fee,
    repayment_method, set_repayment_method,
    loan_period, set_loan_period,
    available_location, set_available_location,
    title, set_title,
    contents, set_contents,
  };

  const site_key = process.env.NEXT_PUBLIC_SITE_KEY ?? '';

  const router = useRouter()
  // TODO 도메인 없어서 리캡챠 테스트 못함
  const {executeRecaptcha, loaded} = useReCaptcha()
  const handleSubmit = async (): Promise<void> => {
    router.push('/login')
    if(loaded) {
      const token = await executeRecaptcha('form_submit')
      try {
        const body: test_captcha = {
          test_data: 'oh ho ho',
          recaptcha_token: token,
        }
        const res = await fetch('/shared/api/recaptcha', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(res => res.json())
        if(res.success && res.score > 0.5) {
          // router.push('/login')
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('아직 executeRecaptcha가 로드되지 않음')
    }
  }

  useEffect(() => {
    if(step == 4) {
      handleSubmit()
    }
  }, [step]);

  return (
    <ReCaptchaProvider reCaptchaKey={site_key}>
      <Register_data_context.Provider value={default_value}>
        <Switcher step={step} setStep={setStep}/>
        {/*<button onClick={() => handleSubmit()}>haha</button>*/}
      </Register_data_context.Provider>
    </ReCaptchaProvider>
  );
}

function Switcher({
  step,
  setStep
}: {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
}) {
  switch (step) {
    case 0: return <Register_generic_user_info setStep={setStep}/>
    case 1: return <Register_brokerage_info setStep={setStep}/>
    case 2: return <Register_company_info setStep={setStep}/>
    case 3: return <Register_company_page_info setStep={setStep}/>
    case 4: return <></>
    default: throw new Error('register page switcher')
  }
}
