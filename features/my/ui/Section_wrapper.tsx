import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Sidebar from "@/features/my/ui/Sidebar";
import style from './style.module.scss';
import Topbar from "@/features/my/ui/Topbar";

export default function Section_wrapper({
	children,
}: {children: React.ReactNode}) {
	return (
		<Section backgroundColor={'surface'}>
			<Row width={'fill'} gap={24}>
				<Sidebar/>
        <Col className={style.contents_container} gap={16}>
          <Topbar/>
          <Col width={'fill'}>
            {children}
          </Col>
        </Col>
      </Row>
    </Section>
  );
}
