'use server'

import {ICompany_detail} from "@/shared/type";
import get_temp_image from "@/shared/api/get_temp_image";

export default async function get_company_detail(): Promise<ICompany_detail> {
	return {
		id: 'id',
		title: '無방문 24시 당일입금 비대면 정식등록업체 간편진행',

		registration_number: '2024-대구북구-0012(대부)',
		company_name: '아이엠 대부',
		phone_number: '010-4303-0993',
		exponent: '이은미',
		address: '대구광역시 북구 중앙대로 550-14, 101호 (칠성동2가)',
		registrar: '대구 북구 경제통상과( 053-665-2648 )',
		registration_certificate: get_temp_image(),

		monthly_interest_rate: '월 1%~1.6%',
		yearly_interest_rate: '연 10%~11%',
		delinquent_interest_rate: '없음',
		loan_limit: '상담',
		additional_cost: '무',
		early_repayment_fee: '무',
		repayment_method: '상담 후 결정',
		loan_period: '상담',
		location: '경기',

		contents: '안녕하세요.\n\n저희 [아이엠대부]은\n현재 코로나19와 강해진 정부의 대출규제로 인해 대출에 고민이 많으신 분들에게\n최대한의 도움을 드리고자 합니다.\n\n(당일 대출)을 원칙으로 급하신 자금 빠르게 맞춰 드리고 있습니다.\n\n저희 [행복저축대부중개]는\n당연히 신용 조회가 없고 비밀보장 및 개인정보 보호를 약속드리며\n일체의 수수료와 출장비를 요구하지 않습니다.\n\n간단한 상담 후 대출 진행을 해 드리고 있으며\n\n◆무직자 ◆연체자 ◆직장인 ◆주부 ◆사업자\n◆대출과다 ◆유흥업종사자 ◆프리랜서 ◆회생자\n◆한도초과자 ◆추가대출 ◆생활비 ◆대환 등 \n\n50만원부터 2000만원까지 당일 대출 가능합니다.\n(그 이상의 금액은 상담 후 결정됩니다.)\n\n★완벽 비밀보장!\n★無담보\n★無보증\n★無조회\n★거래기록 無!\n\n개인신용을 조회하지 않으므로 신용 변동 및 금융권 개인정보와는 무관하며\n\n친절하고 꼼꼼한 고객관리로 고객님의 정보는 100% 비밀 보장 됩니다.\n\n그 밖의 계좌 비밀번호나 불법 수수료 및 체크카드를 절대 요구하지 않으며 정식 허가받지않은 업체에 유의하시길 바랍니다.\n\n☎️ 고민 하지 마시고 상담 편하게 받아보세요! ☎️\n\n\n\n☎ 대출나라를 보고 연락드렸다고 하시면 보다 상담이 쉬워집니다.',
	}
}