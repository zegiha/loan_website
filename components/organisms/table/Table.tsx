import {Col} from "@/components/atoms/layout";

export default function Table({
  head,
  children,
  className,
}: {
  head?: React.ReactNode,
  children: React.ReactNode,
  className?: string;
}) {
  return (
    <Col
      width={'fill'}
      gap={8}
      className={className}
    >
      {head && head}
      {children}
    </Col>
  );
}
