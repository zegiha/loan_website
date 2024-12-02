import {Row} from "@/components/atoms/layout";
import style from './table.module.scss';

export default function TableRow({className, children}: {className?: string, children: React.ReactNode}) {
  return (
    <Row
      width={'fill'}
      gap={16}
      className={className ? className : style.tableRow}
    >
      {children}
    </Row>
  );
}
