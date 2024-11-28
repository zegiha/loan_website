'use server'
import {Col} from "@/components/atoms/layout";

export default async function TextTable({
  children,
  className,
}: {
  children: React.ReactNode,
  className?: string;
}) {
  return (
    <Col
      width={'fill'}
      gap={12}
      className={className}
    >
      {children}
    </Col>
  );
}
