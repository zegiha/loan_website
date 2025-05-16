export interface ICompany_row {
	id: string;
	location: string;
	category?: string;
	loan_limit: string;
	title: string;
	name: string;
}

export interface ICompany_row_having_is_visible_company_name extends Omit<ICompany_row, 'category'> {
	is_visible_company_name: boolean;
}
