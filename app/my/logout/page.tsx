'use client'

import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import {authControllerLogout} from '@/entities/api/auth/auth'
import {userControllerProfile} from '@/entities/api/user/user'
import my_navigations from "@/features/my/lib/my_navigations";
import load from '@/public/assets/load_dot_120.json';
import Typo from "@/components/atoms/typo/Typo";
import dynamic from "next/dynamic";
import {use_auth_store} from "@/shared/store/authStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Logout_page() {
  const {setIsLogin} = use_auth_store()
  const router = useRouter()
  const logout = async () => {
   try {
     await authControllerLogout()
     return true
   } catch (e) {
     console.error(e)
     return false
   }
}

   useEffect(() => {
     logout()
       .then(res => {
         if(res)
           setTimeout(() => {
             const test = async () => {
               // const res = await userControllerProfile()
               setIsLogin(false)
               router.replace('/')
             }
             test()
           }, 1000)
       })
   }, [])

  return (
    <Col width={'fill'}>
      <Section_wrapper title={'마이페이지'} navigations={my_navigations}>
        <Col width={'fill'} alignItems={'center'} gap={12}>
          <Typo.Body emphasize>
            로그아웃 중
          </Typo.Body>
          <Player src={load} autoplay loop style={{width: 160}}/>
        </Col>
      </Section_wrapper>
    </Col>
  )
}
