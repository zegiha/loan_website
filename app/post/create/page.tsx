'use client'

import React, {useEffect, useState} from "react";
import {IPost_data, Post_data_context, TJobStatus} from "@/features/create_post_profile/context/post_data_context";
import Create_post_profile from "@/features/create_post_profile/ui/profile";
import Create_post_post from "@/features/create_post_profile/ui/post";
import Create_post_loan from "@/features/create_post_profile/ui/loan";
import {useRouter} from "next/navigation";
import TLocation from "@/shared/type/TLocation";

export default function Create_post() {
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>("MALE");
  const [age, setAge] = useState<string>('');
  const [phone_number, setPhone_number] = useState<string>('');
  const [job, setJob] = useState<TJobStatus>('무직');
  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [monthly_income, set_monthly_income] = useState<string | null>(null)
  const [location, set_location] = useState<Exclude<TLocation, '전체'> | null>(null)
  const [loan_type, set_loan_type] = useState<'신용' | '담보' | null>(null)

  const defaultValue: IPost_data = {
    gender, setGender,
    age, setAge,
    phone_number, setPhone_number,
    job, setJob,
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
      router.push('/')
    }
  }, [step])

  return (
    <Post_data_context.Provider value={defaultValue}>
      <Switcher step={step} setStep={setStep}/>
    </Post_data_context.Provider>
  )
}

function Switcher({
 step, setStep
}: {step: number, setStep: React.Dispatch<React.SetStateAction<number>>}) {
  switch (step) {
    case 0: return <Create_post_profile setStep={setStep} />
    case 1: return <Create_post_loan setStep={setStep}/>
    case 2: return <Create_post_post
      setStep={setStep}
    />
  }
}
