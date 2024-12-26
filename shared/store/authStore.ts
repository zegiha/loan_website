import {create} from "zustand";

export interface IAuthStore {
  isLogin: boolean,
  setIsLogin: (v: boolean) => void
  access_token?: string,
  setAccess_token: (v: string) => void;
}

export const use_auth_store = create<IAuthStore>(setState => ({
  isLogin: false,
  setIsLogin: (v) => setState({isLogin: v}),
  access_token: undefined,
  setAccess_token: (v) => setState({access_token: v}),
}))
