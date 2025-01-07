'use server'

import {cookies} from "next/headers";

export default async function leave_action(
  id: string,
  password: string
) {
  // TODO 회원탈퇴 API 요청
  const cookie_store = await cookies()
  cookie_store.delete('refresh_token')
  return {
    status: 200,
  }
}
