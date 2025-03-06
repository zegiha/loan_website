export interface ILoan_inquiry_detail {
	post: {
		title: string
		contents: string
		createdAt: string
	}
	author: {
		age: number
		gender: 'MALE' | 'FEMALE'
		monthly_income: string
		is_job: boolean
	}
	loan: {
		location: string
		amount: string
		category: '신용' | '담보'
	}
}