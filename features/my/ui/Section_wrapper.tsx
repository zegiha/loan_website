import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Sidebar from "@/features/my/ui/Sidebar";
import style from './style.module.scss';

export default function Section_wrapper({
	children,
}: {children: React.ReactNode}) {
	return (
		<Section backgroundColor={'surface'}>
			<Row width={'fill'} gap={24}>
				<Sidebar/>
				{/*TODO Navigation top bar*/}
				<div className={style.contents_container}>
					<Col width={'fill'}>
						{children}
					</Col>
				</div>
			</Row>
		</Section>
	);
}