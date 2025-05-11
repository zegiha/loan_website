export interface ICompany_detail {
	id: string;
	title: string;

	registration_number: string;
	company_name: string;
	phone_number: string;
	exponent: string;
	address: string;
	registrar: string;

	monthly_interest_rate: string;
	yearly_interest_rate?: string;
	delinquent_interest_rate?: string;
	loan_limit?: string;
	additional_cost?: string;
	early_repayment_fee?: string;
	repayment_method?: string;
	loan_period?: string;
	location?: string;

	contents: string;
}