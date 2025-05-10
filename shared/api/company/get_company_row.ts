import {ICompany_row} from "@/shared/type";

export default async function get_company_row(): Promise<Array<ICompany_row>> {
	const dummy: ICompany_row = {
		id: 'id',
		title: '당 일 승 인 500만OK 빠 른 진 행',
		location: '서울',
		loan_limit: '500만원',
		name: '대부중개',
		category: '직장인 대출',
	}
	const dummies: Array<ICompany_row> = []
	for(let i = 0; i < 20; i++) dummies.push(dummy)

	return dummies
}