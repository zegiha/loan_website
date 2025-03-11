'use server'

import {cookies} from "next/headers";

export default async function leave_action(
  id: string,
  password: string
) {
  // TODO 회원탈퇴 API 요청
  const cookie_store = await cookies()
  const leave_token = process.env.PRIVATE_LEAVE_TOKEN
  cookie_store.delete('refresh_token')
  if(leave_token) {
    const expire_date = new Date()
    expire_date.setDate(expire_date.getDate() + 7)
    cookie_store.set('leave_token', leave_token, {
      httpOnly: true,
      expires: expire_date
    })
  }
  else throw new Error('No Private Leave Token in Env')
  return {
    status: 200,
  }
}
