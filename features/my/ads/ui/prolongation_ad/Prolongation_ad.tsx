import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {
	adsPublicControllerRequestDateExtend,
	useAdsPublicControllerFindOne
} from '@/entities/api/advertisement-public/advertisement-public'
import {Table} from "@/components/organisms";
import style from '../style.module.scss'
import {BaseButton, button} from "@/components/molecules/inputs";
import {Desc_table_head, Desc_table_row} from "@/features/my/ads/ui/prolongation_ad/Desc_table";
import {Buy_info_table} from "@/features/my/ads/ui/prolongation_ad/Buy_info_table";
import {useState} from "react";
import {is_typed} from "@/shared/helper";

export default function Prolongation_ad({
	id,
	close_func,
}: {
	id: string
	close_func: () => void,
}) {
	const [depositor, set_depositor] = useState<string>('')

	const {
		data,
		status,
	} = useAdsPublicControllerFindOne(id, {
		query: {
			select: v => {
				return {
					name: v.ad_name ?? '',
					price: v.deposit_fee ?? '',
					end_date: new Date(v.ad_present_expire_date ?? '')
				}
			}
		}
	})

	const handle_submit = () => {
		if(is_typed(depositor) === null && data?.price) {
			adsPublicControllerRequestDateExtend(
				id,
				{
					deposit_name: depositor,
					deposit_fee: data.price.toString(),
				}
			)
				.then(() => {
					close_func()
				})
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
					{status === 'success' && (
						<Desc_table_row
							ad_name={data.name}
							price={Number(data.price)}
							current_end_date={data.end_date}
							new_end_date={new Date()}
						/>
					)}
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