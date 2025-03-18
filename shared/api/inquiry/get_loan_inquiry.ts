import {ILoan_inquiry_data} from "@/shared/type";

export default async function get_loan_inquiry(): Promise<Array<ILoan_inquiry_data>> {
	const dummy: ILoan_inquiry_data = {
		id: 'id',
		category: '신용',
		location: '인천',
		title: '200 대출문의드립니다',
		createdAt: '2분 전',
		views: 293,
	};
	const res: Array<ILoan_inquiry_data> = [];
	for(let i = 0; i < 31; i++) res.push(dummy)
	return res;
}