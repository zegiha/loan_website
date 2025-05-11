import {create} from "zustand";

export interface IAuthStore {
  isLogin: boolean,
  setIsLogin: (v: boolean) => void
}

export const use_auth_store = create<IAuthStore>(setState => ({
  isLogin: false,
  setIsLogin: (v) => setState({isLogin: v}),
}))
