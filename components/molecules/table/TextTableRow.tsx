'use server'
import {Row} from "@/components/atoms/layout";

export default async function TextTableRow({children}: {children: React.ReactNode}) {
  return (
    <Row
      width={'fill'}
      gap={12}
    >
      {children}
    </Row>
  );
}
