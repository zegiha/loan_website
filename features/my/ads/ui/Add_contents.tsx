'use client'

import {Col, Row} from "@/components/atoms/layout";
import {useAdsPublicControllerFindAllofMyAds} from '@/entities/api/advertisement-public/advertisement-public'
import style from './style.module.scss';
import Typo from "@/components/atoms/typo/Typo";
import {Table} from "@/components/organisms";
import {
	My_ads_table_head,
	My_ads_table_row
} from "@/features/my/ads/ui/My_adds_table";
import Modal from "@/components/molecules/modal/Modal";
import {ReactNode, useEffect, useState} from "react";
import Edit_ad from "@/features/my/ads/ui/edit_ad/Edit_ad";
import {TAds_name} from "@/shared/type";
import ad_list from "@/shared/constants/ad_list";
import TAds_type from "@/shared/type/advertisement/TAds_type";
import {BaseButton} from "@/components/molecules/inputs";
import {CloseIcon} from "@/components/atoms/icons";
import Prolongation_ad from "@/features/my/ads/ui/prolongation_ad/Prolongation_ad";

export interface IMy_ads {
	id: string
	ad_name: TAds_name
	title?: string
	end_date?: Date
}

export default function Add_contents() {
	const [is_edit_open, set_is_edit_open] = useState(false);
	const [is_prolongation_open, set_is_prolongation_open] = useState(false);
	const [ad_info, set_ad_info] = useState<string | null>(null)

	const {
		data,
		status,
	} = useAdsPublicControllerFindAllofMyAds({
    query: {
      select: v => {
        const res: Array<IMy_ads> = []
        v.forEach(v => {
          res.push({
						id: v.id,
            ad_name: v.ad_name === '메인 배너광고' ? '메인 베너광고' : v.ad_name,
            title: v.title ?? '',
            end_date: new Date(v.ad_present_expire_date ?? '')
          })
        })
        return res
      }
    }
  })

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
            {status === 'success' && (
              data.map((v, i) => (
                <My_ads_table_row
                  key={i}
                  {...v}
                  option={v.ad_name === '줄광고' ?
                    {off_edit: false, off_prolongation: true}:
                    v.ad_name === '실시간 대출문의 업체 등록' || v.ad_name === '줄광고 점프 추가 사용' ?
                    {off_edit: true, off_prolongation: true}:
                    {off_edit: false, off_prolongation: false}
                  }
                  edit_action={() => {
                    set_ad_info(v.id)
                    set_is_edit_open(true)
                  }}
                  prolongation_action={() => {
                    set_ad_info(v.ad_name)
                    set_is_prolongation_open(true)
                  }}
                />
              ))
            )}
					</Table>
				</Col>
			</Col>
			<Modal isOpen={is_edit_open} setIsOpen={set_is_edit_open}>
				<Modal_wrapper close_func={() => set_is_edit_open(false)}>
					{ad_info !== null && (
						<Edit_ad
							id={ad_info}
						/>
					)}
				</Modal_wrapper>
			</Modal>
			<Modal isOpen={is_prolongation_open} setIsOpen={set_is_prolongation_open}>
				<Modal_wrapper close_func={() => set_is_prolongation_open(false)}>
					<Prolongation_ad
						name={'메인 베너광고'}
						price={1000000}
						end_date={new Date()}
						close_func={() => set_is_prolongation_open(false)}
					/>
				</Modal_wrapper>
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


