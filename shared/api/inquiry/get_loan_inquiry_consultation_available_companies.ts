import {ILoan_inquiry_consultation_available_companies} from "@/shared/type";

export default async function get_loan_inquiry_consultation_available_companies(id: string): Promise<Array<ILoan_inquiry_consultation_available_companies>> {
	const dummy: ILoan_inquiry_consultation_available_companies = {
		location: '전국',
		name: '허니대부중개',
		phone: '010-9298-4044',
	}
	const res: Array<ILoan_inquiry_consultation_available_companies> = []
	for(let i = 0; i < 10; i++) res.push(dummy);
	return res;
}
