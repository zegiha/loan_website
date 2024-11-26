'use server'
import {Row} from "@/components/atoms/layout";
import style from './table.module.scss';

export default async function TableRow({children}: {children: React.ReactNode}) {
  return (
    <Row
      width={'fill'}
      gap={16}
      className={style.tableRow}
    >
      {children}
    </Row>
  );
}
