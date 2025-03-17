'use server'

import {IPremium_banner_data} from "@/shared/type";

export default async function get_premium_banner(): Promise<Array<IPremium_banner_data>> {
	// const data = await fetch();

	const dummy: IPremium_banner_data = {
		id: 'id',
		title: '저신용자 상관없음 무서류 저신용자 상관 없음 무서류',
		location: '전국',
		name: '스피드 대출'
	}
	const dummies: Array<IPremium_banner_data> = []
	for(let i = 0; i < 10; i++) dummies.push(dummy)

	return dummies
}