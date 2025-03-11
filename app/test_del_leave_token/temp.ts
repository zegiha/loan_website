'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function temp() {
	const cookie_store = await cookies()
	cookie_store.delete('leave_token')
	redirect('/login')
}