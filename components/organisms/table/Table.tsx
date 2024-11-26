'use server'
import {Col} from "@/components/atoms/layout";

export default async function Table({
  head,
  children,
  className,
}: {
  head: React.ReactNode,
  children: React.ReactNode,
  className?: string;
}) {
  return (
    <Col
      width={'fill'}
      gap={8}
      className={className}
    >
      {head}
      {children}
    </Col>
  );
}
