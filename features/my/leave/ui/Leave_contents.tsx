'use client'

import {ReloadIcon} from '@/components/atoms/icons'
import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {authControllerLogin} from '@/entities/api/auth/auth'
import {userControllerRequestWithdrawal} from '@/entities/api/user/user'
import {error_checker, is_correct_id, is_correct_password} from "@/shared/helper";
import {useState} from "react";
import {use_auth_store} from "@/shared/store/authStore";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_32.json';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Leave_contents() {
  const [id, set_id] = useState<string>('')
  const [password, set_password] = useState<string>('')

  const {setIsLogin} = use_auth_store()
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const handle_submit = async () => {
    if(status === 'pending' || status === 'success') return
    setStatus('pending')
    if(
      error_checker([is_correct_id], id) === null &&
      error_checker([is_correct_password], password) === null
    ) {
      try {
        await authControllerLogin({id, password})
        await userControllerRequestWithdrawal()
        setIsLogin(false)
        router.push("/")
      } catch (error) {
        setStatus('error')
      }
    }
  }

  return (
    <InputSection title={'회원탈퇴'} isForm>
      <Col gap={32} width={'fill'}>
        <Col gap={16} width={'fill'}>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>
              아이디
            </Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              value={id}
              placeholder={'아이디를 입력해주세요'}
              onChangeAction={(v) => set_id(v)}
              checkError={[is_correct_id]}
            />
          </Col>
          <Col gap={4} width={'fill'}>
            <Typo.Caption color={'dim'}>
              비밀번호
            </Typo.Caption>
            <BaseTextInput
              width={'fill'}
              size={'normal'}
              inputType={'password'}
              value={password}
              placeholder={'비밀번호를 입력해주세요'}
              onChangeAction={(v) => set_password(v)}
              checkError={[is_correct_password]}
            />
          </Col>
        </Col>
        <BaseButton
          className={button.primary_button36}
          onClick={handle_submit}
          disabled={status === 'pending' || status === 'success'}
        >
          {status === 'pending' && (
            <Player
              src={load}
              style={{height: 12}}
              autoplay
              loop
            />
          )}
          {status === 'idle' && (
            <Typo.Contents color={'onPrimary'} emphasize>
              회원탈퇴
            </Typo.Contents>
          )}
          {status === 'error' && (
            <Row gap={4} alignItems={'center'}>
              <ReloadIcon color={'white'}/>
              <Typo.Contents color={'onPrimary'} emphasize>
                회원탈퇴
              </Typo.Contents>
            </Row>
          )}
        </BaseButton>
      </Col>
    </InputSection>
  )
}
