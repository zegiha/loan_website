'use client'

import {Col, Row} from "@/components/atoms/layout";
import style from './style.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {
	My_ads_table_head,
	My_ads_table_row
} from "@/features/my/ads/ui/My_adds_table";
import Modal from "@/components/molecules/modal/Modal";
import {ReactNode, useState} from "react";
import Edit_ad from "@/features/my/ads/ui/edit_ad/Edit_ad";
import {TAds_name} from "@/shared/type";
import ad_list from "@/shared/constants/ad_list";
import TAds_type from "@/shared/type/advertisement/TAds_type";
import {BaseButton} from "@/components/molecules/inputs";
import {CloseIcon} from "@/components/atoms/icons";

export interface IMy_ads {
	ad_name: TAds_name
	ad_type: TAds_type
	title: string
	views: number
	registered_date: Date
}

function get_dummies(): Array<IMy_ads> {
	const res: Array<IMy_ads> = []
	ad_list.forEach((v) => {
		res.push({
			ad_type: v.type_name,
			ad_name: v.name,
			title: '전라 지역 당일 대출',
			views: 139,
			registered_date: new Date()
		})
	})
	return res
}

export default function Add_contents() {
	const [is_edit_open, set_is_edit_open] = useState(false);
	const [is_prolongation_open, set_is_prolongation_open] = useState(false);
	const [ad_info, set_ad_info] = useState<{name: TAds_name, type: TAds_type} | null>(null)

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
						{get_dummies().map((v, i) => (
							<My_ads_table_row
								key={i}
								{...v}
								option={v.ad_type !== 'no_data_req' ?
									{off_edit: false, off_prolongation: false}:
									{off_edit: true, off_prolongation: true}
								}
								edit_action={() => {
									set_ad_info({name: v.ad_name, type: v.ad_type})
									set_is_edit_open(true)
								}}
								prolongation_action={() => {
									set_ad_info({name: v.ad_name, type: v.ad_type})
									set_is_prolongation_open(true)
								}}
							/>
						))}
					</Table>
				</Col>
			</Col>
			<Modal isOpen={is_edit_open} setIsOpen={set_is_edit_open}>
				<Modal_wrapper close_func={() => set_is_edit_open(false)}>
					{ad_info !== null && (
						<Edit_ad
							ad_type={ad_info.type}
							ad_name={ad_info.name}
						/>
					)}
				</Modal_wrapper>
			</Modal>
			<Modal isOpen={is_prolongation_open} setIsOpen={set_is_prolongation_open}>
				{/*TODO 광고연장창 만들기*/}
			</Modal>
		</>
	);
}

function Modal_wrapper({
	children,
	close_func
}:{
	children: ReactNode
	close_func: () => void
}) {
	return (
		<div
			className={style.modal_wrapper}
			onClick={e => e.stopPropagation()}
		>
			<Col className={style.container}>
				<Col className={style.wrapper}>
					<Row width={'fill'} justifyContents={'end'}>
						<BaseButton className={style.close_button} onClick={close_func}>
							<CloseIcon size={24} color={'dim'} />
						</BaseButton>
					</Row>
					{children}
				</Col>
			</Col>
		</div>
	)
}


