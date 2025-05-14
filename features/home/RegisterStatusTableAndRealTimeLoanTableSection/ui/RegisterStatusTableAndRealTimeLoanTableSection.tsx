'use client'
import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import RegisterStatusTable from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/ui/RegisterStatusTable";
import RealTimeLoanTable from "@/features/home/RegisterStatusTableAndRealTimeLoanTableSection/ui/RealTimeLoanTable";
import {Section} from "@/components/molecules";
import style from './style.module.scss';
import {Article_icon, CompanyIcon} from "@/components/atoms/icons";

export default function RegisterStatusTableAndRealTimeLoanTableSection() {
  return (
    <>
      <Section backgroundColor={'surface'}>
        <Row
          width={'fill'}
          gap={24}
          className={style.container}
        >
          <Col
            width={'fill'}
            gap={24}
          >
            <Row gap={8} alignItems={'center'}>
              <CompanyIcon size={28} fill={false}/>
              <Typo.Body emphasize>
                대출업체 등록 현황
              </Typo.Body>
            </Row>
            <RegisterStatusTable/>
          </Col>
          <Col
            width={'fill'}
            gap={24}
          >
            <Row gap={8} alignItems={'center'}>
              <Article_icon size={28} fill={false}/>
              <Typo.Body emphasize>
                실시간 대출 문의글
              </Typo.Body>
            </Row>
            <RealTimeLoanTable/>
          </Col>
        </Row>
      </Section>
    </>
  );
}


