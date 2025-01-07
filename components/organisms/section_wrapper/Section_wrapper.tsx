import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import style from './style.module.scss';
import {TNavigation} from "@/shared/type/navigation";
import {Sidebar, Topbar} from "@/components/molecules/Layout";

export default function Section_wrapper({
	children,
  navigations,
}: {
  children: React.ReactNode
  navigations: Array<TNavigation>
}) {
	return (
		<Section backgroundColor={'surface'}>
			<Row width={'fill'} gap={24}>
				<Sidebar navigations={navigations}/>
        <Col className={style.contents_container} gap={16}>
          <Topbar navigations={navigations}/>
          <Col width={'fill'}>
            {children}
          </Col>
        </Col>
      </Row>
    </Section>
  );
}
