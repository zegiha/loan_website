'use server'

import {cookies} from "next/headers";

export default async function logout_action() {
  const cookie_store = await cookies()
  // TODO API 호출
  cookie_store.delete('refresh_token')
  return {
    status: 200,
  }
}
