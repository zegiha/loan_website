'use client'

import React, {useEffect, useState} from "react";
import {IPost_data, Post_data_context} from "@/features/create_post_profile/context/post_data_context";
import Create_post_profile from "@/features/create_post_profile/ui/profile";
import Create_post_post from "@/features/create_post_profile/ui/post";
import Create_post_loan from "@/features/create_post_profile/ui/loan";
import {useRouter} from "next/navigation";
import axios from "axios";
import TLocation from "@/shared/type/TLocation";

const upload = async () => {
  try {
    const res = await axios.post('https://loan.apne2a.algorix.cloud/loanboard', {
      type: '신용',
      available_location: '서울',
      desired_amount: 10000,
      age: 30,
      gender: 'male',
      tel: '01012345678',
      monthly_income: 100000,
      job_status: true,
      title: 'tttt',
      content: 'haha'
    })
    console.log(`success: ${res}`)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export default function Create_post() {
  const [step, setStep] = useState(2);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>("MALE");
  const [age, setAge] = useState<string>('');
  const [phone_number, setPhone_number] = useState<string>('');
  const [has_job, setHas_job] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [monthly_income, set_monthly_income] = useState<string | null>(null)
  const [location, set_location] = useState<TLocation | null>(null)
  const [loan_type, set_loan_type] = useState<'신용' | '담보' | null>(null)

  const defaultValue: IPost_data = {
    gender, setGender,
    age, setAge,
    phone_number, setPhone_number,
    has_job, setHas_job,
    title, setTitle,
    contents, setContents,
    amount, setAmount,
    monthly_income, set_monthly_income,
    location, set_location,
    loan_type, set_loan_type,
  }

  const router = useRouter()

  useEffect(() => {

    if(step === 3) {
    } else if(step > 3) {
      router.push('/')
      setStep(2);
    }
  }, [step]);

  return (
    <Post_data_context.Provider value={defaultValue}>
      <Switcher step={step} setStep={setStep}/>
    </Post_data_context.Provider>
  );
}

function Switcher({
 step, setStep
}: {step: number, setStep: React.Dispatch<React.SetStateAction<number>>}) {
  switch (step) {
    case 0: return <Create_post_profile setStep={setStep} />
    case 1: return <Create_post_loan setStep={setStep}/>
    case 2: return <Create_post_post
      test={upload}
      setStep={setStep}
    />
  }
}
