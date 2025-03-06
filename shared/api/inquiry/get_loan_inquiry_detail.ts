'use server'

import {ILoan_inquiry_detail} from "@/shared/type";

export default async function get_loan_inquiry_detail(): Promise<ILoan_inquiry_detail> {
	return {
		post: {
			title: '알바생 1000만원 대출 문의',
			contents: '다음주부터 아르바이트 근무 예정입니다\n1000만원 필요한데 가능한 곳 있을까요?',
			createdAt: '2025.03.06 16:09'
		},
		author: {
			age: 24,
			gender: 'FEMALE',
			is_job: false,
			monthly_income: '없음',
		},
		loan: {
			location: '충북',
			amount: '1000 만원',
			category: '신용',
		}
	}
}