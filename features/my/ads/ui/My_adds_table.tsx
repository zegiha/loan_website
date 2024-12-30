import {TableHead, TableRow} from "@/components/molecules";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'

function My_ads_table_head() {
	return <TableHead>
		<Typo.Contents width={92}>
			광고 형식
		</Typo.Contents>
		<Typo.Contents width={'fill'}>
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
}

interface IMyAdds_table_row {
	add_type: string
	title: string
	views: string
	registered_date: Date
}

function My_ads_table_row({
	add_type,
	title,
	views,
	registered_date,
}: IMyAdds_table_row) {
	const processed_date = `${registered_date.getFullYear()}.${registered_date.getMonth() + 1}.${registered_date.getDate()}`;
	return <TableRow className={style.table_row}>
		<Typo.Contents width={92}>
			{add_type}
		</Typo.Contents>
		<Typo.Contents width={'fill'}>
			{title}
		</Typo.Contents>
		<Typo.Contents width={60}>
			{views}
		</Typo.Contents>
		<Typo.Contents width={92}>
			{processed_date}
		</Typo.Contents>
		<Typo.Contents width={80}>
			광고연장
		</Typo.Contents>
		<Typo.Contents width={50}>
			수정
		</Typo.Contents>
	</TableRow>
}

export {
	My_ads_table_head,
	My_ads_table_row,
}