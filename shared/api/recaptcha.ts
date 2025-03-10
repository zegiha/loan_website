// TODO 도메인 없어서 리캡챠 테스트 못함
'use server'
import {NextResponse} from "next/server";

export interface test_captcha {
	recaptcha_token: string
	test_data: string
}

export default async function recapcha(req: Request): Promise<NextResponse<{
	success: boolean
	test_data: string
	score: number
}>> {
	const secret_key = process?.env?.RECAPTCHA_SECRET_KEY
	if(!secret_key)
		throw new Error('Missing environment variable for recaptcha');

	const post_data: test_captcha = await req.json()
	const {recaptcha_token, test_data} = post_data

	let res: any
	const formData = new URLSearchParams({
		secret: secret_key,
		response: recaptcha_token,
	});

	try {
		const raw_res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			body: formData,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
		res = await raw_res.json()
	} catch (e) {
		console.error(e);
	}

	if(res && res.success && res.score > 0.5) {
		return NextResponse.json({
			success: true,
			test_data,
			score: res.score
		})
	} else {
		return NextResponse.json({
			success: false,
			test_data,
			score: res?.score
		})
	}
}