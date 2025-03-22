'use client'

import {Col} from "@/components/atoms/layout";
import style from './style.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {
	My_ads_table_head,
	My_ads_table_row
} from "@/features/my/ads/ui/My_adds_table";
import Modal from "@/components/molecules/modal/Modal";
import {useState} from "react";
import Edit_ad from "@/features/my/ads/ui/edit_ad/Edit_ad";

export default function Add_contents() {
	const now = new Date();
	const [is_edit_open, set_is_edit_open] = useState(false);
	const [is_prolongation_open, set_is_prolongation_open] = useState(false);
	return (
		<>
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
							add_type={'메인 베너광고'}
							title={'전라 지역 당일 대출'}
							views={'139'}
							registered_date={now}
							edit_action={() => {set_is_edit_open(true)}}
							prolongation_action={() => {set_is_prolongation_open(true)}}
						/>
					</Table>
				</Col>
			</Col>
			<Modal isOpen={is_edit_open} setIsOpen={set_is_edit_open}>
				<Edit_ad
					set_is_open={set_is_edit_open}
					ad_type={'banner'}
					ad_name={'메인 베너광고'}
				/>
			</Modal>
			<Modal isOpen={is_prolongation_open} setIsOpen={set_is_prolongation_open}>
				{/*TODO 광고연장창 만들기*/}
			</Modal>
		</>
	);
}


