import {Col} from "@/components/atoms/layout";

export default function TextTable({
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
