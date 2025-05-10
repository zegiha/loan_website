import {IPremium_banner_data} from "@/shared/type";

export default async function get_premium_banner(): Promise<Array<IPremium_banner_data>> {
	// const data = await fetch();

	const dummy: IPremium_banner_data = {
		id: 'id',
		title: '무서류 + 저신용자 상관 없음',
		location: '전국',
		name: '대부중개'
	}
	const dummies: Array<IPremium_banner_data> = []
	for(let i = 0; i < 10; i++) dummies.push(dummy)

	return dummies
}