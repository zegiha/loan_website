'use client'

import {Col} from "@/components/atoms/layout";
import Section_wrapper from "@/components/organisms/section_wrapper/Section_wrapper";
import my_navigations from "@/features/my/lib/my_navigations";
import load from '@/public/assets/load_dot_120.json';
import Typo from "@/components/atoms/typo/Typo";
import dynamic from "next/dynamic";
import logout_action from "@/features/my/logout/api/logout_action";
import {use_auth_store} from "@/shared/store/authStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(m => m.Player),
  {ssr: false}
)

export default function Logout_page() {
  const {setIsLogin, setAccess_token} = use_auth_store()
  const router = useRouter()
   const logout = async () => {
     try {
       const res = await logout_action();
       if(res.status === 200) {
         setIsLogin(false)
         setAccess_token(undefined)
         router.push('')
       }
     } catch (e) {
       console.error(e)
     }
   }

   useEffect(() => {
     logout();
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
