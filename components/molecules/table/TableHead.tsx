import {Row} from "@/components/atoms/layout";
import style from './table.module.scss';

export default function TableHead({
  children,
  className,
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <Row
      width={'fill'}
      gap={16}
      className={className ? className : style.tableHead}
    >
      {children}
    </Row>
  );
}
