'use client'

import InputSection from "@/components/molecules/Layout/inputSection/InputSection";
import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {BaseButton, BaseTextInput, button} from "@/components/molecules/inputs";
import {error_checker, is_correct_id, is_correct_password} from "@/shared/helper";
import {useState} from "react";
import {use_auth_store} from "@/shared/store/authStore";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";
import load from '@/public/assets/load_dot_32.json';
import {leave_action} from "@/shared/api";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Leave_contents() {
  const [id, set_id] = useState<string>('')
  const [password, set_password] = useState<string>('')

  const {setIsLogin, setAccess_token} = use_auth_store()
  const router = useRouter()
  const [status, set_status] = useState<'before_start' | 'loading' | 'done'>('before_start');

  const handle_submit = async () => {
    if(
      error_checker([is_correct_id], id) === null &&
      error_checker([is_correct_password], password) === null
    ) {
      set_status('loading')
      setTimeout(async () => {
        const try_leave = await leave_action(id, password)
        if(try_leave.status === 200) {
          // setIsLogin(false)
          // setAccess_token(undefined)
          router.push("/my/leave/done")
          set_status('done')
        } else throw new Error('haha')
      }, 3000)
    } else {
      set_status('before_start')
      alert('잘못된 정보가 있습니다')
    }
  }

  return (
    <InputSection title={'회원탈퇴'}>
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
        >
          {status === 'before_start' ? (
            <Typo.Contents color={'onPrimary'} emphasize>
              회원탈퇴
            </Typo.Contents>
          ) : status === 'loading' ? (
            <Player
              src={load}
              style={{height: 12}}
              autoplay
              loop
            />
          ) : (
            <Typo.Contents color={'onPrimary'} emphasize>
              회원탈퇴
            </Typo.Contents>
          )}
        </BaseButton>
      </Col>
    </InputSection>
  )
}
