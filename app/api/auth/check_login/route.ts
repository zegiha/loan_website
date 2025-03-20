'use server'

import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
	const cookie_store = await cookies();
	const refresh_token = cookie_store.get('refresh_token')?.value

	if(!refresh_token) return NextResponse.json({isValid: false}, {status: 401})

	try {
		const is_valid_refresh_token = true // TODO 여기서 refresh_token 제대로 된건지 검사

		if(is_valid_refresh_token) return NextResponse.json({isValid: true})
		else return NextResponse.json({isValid: false}, {status: 401})
	} catch (e) {
		console.error(e)
		return NextResponse.json({isValid: false}, {status: 401})
	}
}