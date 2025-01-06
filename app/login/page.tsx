'use client'

import React, {useState} from "react";
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {useRouter} from "next/navigation";
import {use_auth_store} from "@/shared/store/authStore";
import {login_action} from "@/shared/api/login_action";
import Link from "next/link";

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const {setIsLogin} = use_auth_store();

  const loginAction = async () => {
    if(!id) {
      alert('아이디를 입력해주세요')
    } else {
      if(!password) {
        alert('비밀번호를 입력해주세요')
      } else {
        await login_action(id, password);
        setIsLogin(true);
        router.push('/');
      }
    }
  }

  return (
    <InputSection title={'로그인'}>
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
          <BaseButton className={button.primary_button36} onClick={() => loginAction()}>
            <Typo.SubBody emphasize color={'onPrimary'}>완료</Typo.SubBody>
          </BaseButton>
          <Row width={'fill'} justifyContents={'center'}>
            <Link href={'/register'} onClick={() => console.log('무우빙')}>
              <Typo.Caption color={'dim'} underline>아직 계정이 없으신가요? 회원가입하기</Typo.Caption>
            </Link>
          </Row>
        </Col>
      </Col>
    </InputSection>
  );
}
