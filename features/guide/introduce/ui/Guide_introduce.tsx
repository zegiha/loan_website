import {Section} from "@/components/molecules";
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import Link from "next/link";
import Image from "next/image";
import style from './style.module.scss'
import active_image from '@/public/assets/active_image.svg'
import introduce_company_image from '@/public/assets/introduce_company.png'

export default function Guide_introduce() {
	return (
		<Section backgroundColor={'surface'}>
			<Col gap={128} width={'fill'}>
				<Col gap={24} width={'fill'}>
					<Col>
						<Typo.Header color={'variable'} emphasize>
							어느 곳보다 빠르고, 안전한 대출 플랫폼
						</Typo.Header>
						<Typo.Header color={'primary'} emphasize>
							~에 오신걸 환영해요!
						</Typo.Header>
					</Col>
					<Typo.SubBody isPre={'wrap'}>
						{'는 정부에서 사업자 인증을 받은 안전한 대부중개 업체에요\n또한 사용자 분들께 신뢰를 드리기 위해 온라인 대부중개 플랫폼 협의회에서 활동하고있어요'}
					</Typo.SubBody>
					<div className={style.introduce_image_container}>
						<Image
							src={introduce_company_image}
							alt={'기업소개 이미지'}
							fill
							objectFit={'cover'}
						/>
					</div>
				</Col>
				<Col gap={24} width={'fill'}>
					<div className={style.active_image_container}>
						<Col gap={24} width={'fill'}>
							<Col>
								<Typo.Header color={'variable'} emphasize>
									이름은 고객님의 편안한 사용을 위해 힘쓰고 있어요
								</Typo.Header>
							</Col>
							<Col>
								<Row>
									<Typo.SubBody isPre={'wrap'}>
										{'이름은 고객님이 서비스를 더욱 편안하게 활용하실 수 있도록 상세한 '}
									</Typo.SubBody>
									<Link href={'/guide'}>
										<Typo.SubBody isPre={'wrap'} color={'primary'} underline>{'이용안내,\n'}</Typo.SubBody>
									</Link>
								</Row>
								<Row>
									<Typo.SubBody isPre={'wrap'}>
										{'고객님의 안전한 업체 이용을 위해 금감원 인증'}
									</Typo.SubBody>
									<Link href={'/'}>
										{/*TODO 정식 업체 조회 네비게이션 이어두기*/}
										<Typo.SubBody isPre={'wrap'} color={'primary'} underline>{'정식 업체 조회,\n'}</Typo.SubBody>
									</Link>
								</Row>
								<Row>
									<Typo.SubBody isPre={'wrap'}>
										{'친절한 '}
									</Typo.SubBody>
									<Link href={'/customer/announcement'}>
										<Typo.SubBody isPre={'wrap'} color={'primary'} underline>{'고객센터'}</Typo.SubBody>
									</Link>
									<Typo.SubBody isPre={'wrap'}>
										{' 등 다양한 노력을 하고있어요\n'}
									</Typo.SubBody>
								</Row>
								<Typo.SubBody isPre={'wrap'}>
									{'글자들을 눌러서 고객님만을 위한 다양한 서비스들을 제공받아보세요!'}
								</Typo.SubBody>
							</Col>
						</Col>
						<div className={style.active_image_wrapper}>
							<Image src={active_image} alt={'active_image'} fill/>
						</div>
					</div>
				</Col>
			</Col>
		</Section>
	)
}