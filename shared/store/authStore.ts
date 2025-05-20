import {create} from "zustand";
import {userControllerProfile} from "@/entities/api/user/user";

export interface IAuthStore {
  isLogin: boolean,
  checkLogin: () => void
  setIsLogin: (v: boolean) => void
}

export const use_auth_store = create<IAuthStore>(setState => ({
  isLogin: false,
  checkLogin: () => {
    userControllerProfile()
      .then(() => {
        setState(prev => ({...prev, isLogin: true}))
      })
      .catch(() => {
        setState(prev => ({...prev, isLogin: false}))
      })
  },
  setIsLogin: (v) => setState({isLogin: v}),
}))
