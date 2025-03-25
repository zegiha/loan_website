import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import {TAds_name} from "@/shared/type";
import style from "@/features/my/ads/ui/style.module.scss";

export function Desc_table_head() {
	return <TableHead>
		<Typo.Contents width={'fill'}>광고 이름</Typo.Contents>
		<Typo.Contents width={'fill'}>결제 금액</Typo.Contents>
		<Typo.Contents width={'fill'}>기존 종료일</Typo.Contents>
		<Typo.Contents width={'fill'}>연장 종료일</Typo.Contents>
	</TableHead>
}
export function Desc_table_row({
	                        ad_name,
	                        price,
	                        current_end_date,
	                        new_end_date,
                        }: {
	ad_name: TAds_name,
	price: number,
	current_end_date: Date,
	new_end_date: Date,
}) {
	const processed_date = (end_date: Date) => `${end_date.getFullYear()}.${end_date.getMonth() + 1}.${end_date.getDate()}`
	return <TableRow className={style.table_row}>
		<Typo.Contents width={'fill'}>{ad_name}</Typo.Contents>
		<Typo.Contents width={'fill'}>{`${price.toLocaleString('ko-kr')}원`}</Typo.Contents>
		<Typo.Contents width={'fill'}>{processed_date(current_end_date)}</Typo.Contents>
		<Typo.Contents width={'fill'}>{processed_date(new_end_date)}</Typo.Contents>
	</TableRow>
}