import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import React from "react";
import {Col} from "@/components/atoms/layout";
import {IMy_ads} from "@/features/my/ads/ui/Add_contents";

interface IMy_ads_table_row extends IMy_ads{
	edit_action: () => void
	prolongation_action: () => void
	option: {
		off_edit: boolean
		off_prolongation: boolean
	}
}

function My_ads_table_head() {
	return <Col width={'fill'}>
    <TableHead className={style.table_row}>
      <Typo.Contents width={172}>
        광고 형식
      </Typo.Contents>
      <Typo.Contents width={'fill'} className={style.table_row_min_width}>
        제목
      </Typo.Contents>
      <Typo.Contents width={60}>
        조회수
      </Typo.Contents>
      <Typo.Contents width={92}>
        종료일
      </Typo.Contents>
      <Typo.Contents width={80}>
        광고연장
      </Typo.Contents>
      <Typo.Contents width={50}>
        수정
      </Typo.Contents>
    </TableHead>
    <div className={style.divider}/>
  </Col>
}

function My_ads_table_row({
	ad_name,
	title,
	views,
	end_date,
	prolongation_action,
	edit_action,
	option,
}: IMy_ads_table_row) {
	const processed_date = `${end_date.getFullYear()}.${end_date.getMonth() + 1}.${end_date.getDate()}`;
	return <TableRow className={style.table_row}>
		<Typo.Contents width={172}>
			{ad_name}
		</Typo.Contents>
		<Typo.Contents width={'fill'} className={style.table_row_min_width}>
			{title}
		</Typo.Contents>
		<Typo.Contents width={60}>
			{views}
		</Typo.Contents>
		<Typo.Contents width={92}>
			{processed_date}
		</Typo.Contents>
		<Typo.Contents width={80} underline color={'dim'}>
			{!option.off_prolongation && (
				<span onClick={prolongation_action} style={{cursor: 'pointer'}}>
					광고연장
				</span>
			)}
		</Typo.Contents>
		<Typo.Contents width={50} underline color={'dim'}>
			{!option.off_edit && (
				<span onClick={edit_action} style={{cursor: 'pointer'}}>
					수정
				</span>
			)}
		</Typo.Contents>
	</TableRow>
}

export {
	My_ads_table_head,
	My_ads_table_row,
}
