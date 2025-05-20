'use client'

import {authControllerLogin} from '@/entities/api/auth/auth'
import {AxiosError} from 'axios'
import React, {useState} from "react";
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {useRouter} from "next/navigation";
import {use_auth_store} from "@/shared/store/authStore";
import Link from "next/link";

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const {setIsLogin} = use_auth_store()

  const handleLogin = async () => {
    try {
      await authControllerLogin({id, password})
      return 'logged in'
    } catch(e) {
      if(e instanceof AxiosError) {
        switch (e.response?.data.message) {
          case '활동 허가가 되지 않았습니다.':
            alert('아직 회원가입이 승인 되지 않았어요\n기다려주세요')
            break
          case 'User not found':
            alert('잘못된 아이디를 입력하셨어요')
            break
          case 'invalid password':
            alert('비밀번호가 틀렸어요')
            break
          default:
            alert('다시 시도해주세요')
        }
      }
      return false
    }
  }

  const loginAction = async () => {
    if(!id) {
      alert('아이디를 입력해주세요')
    } else {
      if(!password) {
        alert('비밀번호를 입력해주세요')
      } else {
        const res = await handleLogin()
        switch(res) {
          case 'logged in':
            setIsLogin(true)
            router.push('/')
            break
        }
      }
    }
  }

  return (
    <InputSection title={'로그인'} isForm>
      <Col width={'fill'} gap={32}>
        <Col width={'fill'} gap={16}>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>아이디</Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={id}
              onChangeAction={(v) => setId(v)}
              placeholder={'아이디를 입력해주세요'}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>비밀번호</Typo.Caption>
            <BaseTextInput
              width={'fill'}
              inputType={'password'}
              size={'normal'}
              value={password}
              onChangeAction={(v) => setPassword(v)}
              placeholder={'비밀번호를 입력해주세요'}
            />
          </Col>
        </Col>
        <Col width={'fill'} gap={8}>
          <BaseButton type={'submit'} className={button.primary_button36} onClick={() => loginAction()}>
            <Typo.SubBody emphasize color={'onPrimary'}>완료</Typo.SubBody>
          </BaseButton>
          <Row width={'fill'} justifyContents={'center'}>
            <Link href={'/register'}>
              <Typo.Caption color={'dim'} underline>아직 계정이 없으신가요? 회원가입하기</Typo.Caption>
            </Link>
          </Row>
        </Col>
      </Col>
    </InputSection>
  );
}
