import {Col, Row} from "@/components/atoms/layout";
import style from './style.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {
	My_ads_table_head,
	My_ads_table_row
} from "@/features/my/ads/ui/My_adds_table";

export default function Add_contents() {
	const now = new Date();
	return (
		<Col width={'fill'} gap={16}>
			<Typo.Body color={'variable'} emphasize>
				나의 광고
			</Typo.Body>
			<Col width={'fill'} gap={4}>
				<Table
					className={style.table}
					head={<My_ads_table_head/>}
				>
					<My_ads_table_row
						add_type={'VIP 배너'}
						title={'전라 지역 당일 대출'}
						views={'139'}
						registered_date={now}
					/>
				</Table>
			</Col>
		</Col>
	);
}
