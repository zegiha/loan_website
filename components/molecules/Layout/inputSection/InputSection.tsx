import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Form from "next/form";

export default function InputSection({
  title,
  children
}: {
  title: string,
  children: React.ReactNode
}) {
  return (
    <Col
      justifyContents={'center'}
      alignItems={'center'}
      style={{flex: 1, padding: '64px 20px'}}
    >
      <Col gap={16} width={'fill'} style={{maxWidth: 320}}>
        <Typo.Body emphasize color={'variable'}>{title}</Typo.Body>
        <Form action={''} style={{width: '100%'}}>
          <Col gap={16}>
            {children}
          </Col>
        </Form>
      </Col>
    </Col>
  );
}
