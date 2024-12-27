'use server'
import {cookies} from "next/headers";

export async function login_action(id: string, password: string): Promise<void> {
	const refresh_token = 'test_token';
	const cookieStore = await cookies();
	cookieStore.set('refresh_token', refresh_token, {
		httpOnly: true,
	})
}