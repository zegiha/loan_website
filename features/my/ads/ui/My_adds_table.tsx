import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import React from "react";
import {Col} from "@/components/atoms/layout";
import {TAds_name} from "@/shared/type";

function My_ads_table_head() {
	return <Col width={'fill'}>
    <TableHead className={style.table_row}>
      <Typo.Contents width={92}>
        광고 형식
      </Typo.Contents>
      <Typo.Contents width={'fill'} className={style.table_row_min_width}>
        제목
      </Typo.Contents>
      <Typo.Contents width={60}>
        조회수
      </Typo.Contents>
      <Typo.Contents width={92}>
        등록일
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

interface IMyAdds_table_row {
	add_type: TAds_name
	title: string
	views: string
	registered_date: Date
	prolongation_action: () => void
	edit_action: () => void
}

function My_ads_table_row({
	add_type,
	title,
	views,
	registered_date,
	prolongation_action,
	edit_action,
}: IMyAdds_table_row) {
	const processed_date = `${registered_date.getFullYear()}.${registered_date.getMonth() + 1}.${registered_date.getDate()}`;
	return <TableRow className={style.table_row}>
		<Typo.Contents width={92}>
			{add_type}
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
		<span onClick={prolongation_action}>
			<Typo.Contents width={80} underline>
				광고연장
			</Typo.Contents>
		</span>
		<span onClick={edit_action}>
			<Typo.Contents width={50} underline>
				수정
			</Typo.Contents>
		</span>
	</TableRow>
}

export {
	My_ads_table_head,
	My_ads_table_row,
}
