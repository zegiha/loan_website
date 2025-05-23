import React from "react";
import {TableRow} from "@/components/molecules";
import style from '../style.module.scss'
import Typo from "@/components/atoms/typo/Typo";
import {Row} from "@/components/atoms/layout";
import {Table} from "@/components/organisms";
import {ContentCopy} from "@/components/atoms/icons";
import {BaseTextInput} from "@/components/molecules/inputs";
import react_state_action from "@/shared/type/react_state_action";

export function Buy_info_table({
	depositor,
	set_depositor,
}: {
	depositor: string,
	set_depositor: react_state_action<string>
}) {
	return (
		<Table className={style.buy_info_table}>
			<Buy_info_table_row title={'입금 계좌'} contents={
				<Row
					width={'fill'}
					alignItems={'center'}
					gap={4}
					onClick={() => {
						window.navigator.clipboard.writeText('농협은행 351-1306-9323-03').then(() => {
							alert('복사되었습니다')
						})
					}}
					style={{cursor: 'pointer'}}
				>
					<Typo.Contents
						width={'fill'}
						isPre={'wrap'}
						className={style.account_number}
					>
						농협은행 351-1306-9323-03 옹양훈(MNG)대부중개
					</Typo.Contents>
					<ContentCopy color={'normal'} fill={false} size={16}/>
				</Row>
			}/>
			<Buy_info_table_row title={'입금자명'} contents={
				<BaseTextInput
					size={'normal'}
					maxWidth={200}
					placeholder={'입금자명을 입력해주세요'}
					value={depositor}
					onChangeAction={(v) => set_depositor(v)}
				/>
			}/>
		</Table>
	)
}

export function Buy_info_table_row({
  title,
  contents
}: {
	title: string
	contents: React.ReactNode
}) {
	return <TableRow className={style.buy_info_table_row}>
		<Typo.Contents
			color={'variable'}
			width={92}
			isPre={'wrap'}
		>
			{title}
		</Typo.Contents>
		<Row width={'fill'}>
			{contents}
		</Row>
	</TableRow>
}
