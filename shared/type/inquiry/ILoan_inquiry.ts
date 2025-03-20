export interface ILoan_inquiry_data {
	id: string;
	category: '신용' | '담보';
	location: string;
	title: string;
	createdAt: string;
	desired_amount: string;
}
