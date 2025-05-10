import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {TAds_name} from "@/shared/type";
import {Table} from "@/components/organisms";
import style from '../style.module.scss'
import {BaseButton, button} from "@/components/molecules/inputs";
import {Desc_table_head, Desc_table_row} from "@/features/my/ads/ui/prolongation_ad/Desc_table";
import {Buy_info_table} from "@/features/my/ads/ui/prolongation_ad/Buy_info_table";
import {useState} from "react";
import {is_typed} from "@/shared/helper";

export default function Prolongation_ad({
	name,
	price,
	end_date,
	close_func,
}: {
	name: TAds_name,
	price: number,
	end_date: Date,
	close_func: () => void,
}) {
	const [depositor, set_depositor] = useState<string>('')

	const handle_submit = () => {
		if(is_typed(depositor) === null) {
			alert('연장요청 되었습니다')
			close_func()
		} else {
			alert('입금자명을 입력해주세요')
		}
	}

	return (
		<Col gap={24} width={'fill'}>
			<Typo.Title emphasize>
				광고 연장
			</Typo.Title>
			<Col gap={8} width={'fill'}>
				<Table
					className={style.table}
					head={<Desc_table_head/>}
				>
					<Desc_table_row
						ad_name={name}
						price={price}
						current_end_date={end_date}
						new_end_date={new Date()}
					/>
				</Table>
				<Buy_info_table
					depositor={depositor}
					set_depositor={set_depositor}
				/>
			</Col>
			<Row width={'fill'} justifyContents={'end'}>
				<BaseButton className={button.primary_button44} onClick={handle_submit}>
					<Typo.Contents color={'onPrimary'} emphasize>연장하기</Typo.Contents>
				</BaseButton>
			</Row>
		</Col>
	)
}