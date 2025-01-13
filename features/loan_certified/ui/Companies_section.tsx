import {Section} from "@/components/molecules";
import {Col, Divider, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import style from './style.module.scss'
import {useEffect, useState} from "react";
import ICertified_company_summary from "@/features/loan_certified/lib/ICertified_company_summary";
import {SwiperPaginationAndNavigation} from "@/components/organisms";
import get_certified_companies_summary from "@/features/loan_certified/api/get_certified_companies_summary";
import {SwiperSlide} from "swiper/react";
import Certified_company_card from "@/features/loan_certified/ui/Certified_company_card";
import ICertified_company from "@/features/loan_certified/lib/ICertified_company";
import get_certified_company_by_id from "@/features/loan_certified/api/get_certified_company_by_id";
import Modal from "@/components/molecules/modal/Modal";
import {CloseIcon} from "@/components/atoms/icons";
import get_YYYYMMDD from "@/shared/helper/get_YYYYMMDD";
import Certified_company_table from "@/features/loan_certified/ui/Certified_company_table";
import Certified_company_modal from "@/features/loan_certified/ui/Certified_company_modal";

export default function Companies_section({
  search
}: {
  search: string
}) {
  const parse_certified_company_summary_data = (data: Array<ICertified_company_summary>): Array<Array<ICertified_company_summary>> => {
    const res: Array<Array<ICertified_company_summary>> = []
    let temp: Array<ICertified_company_summary> = []
    data.forEach(v => {
      if(temp.length != 0 && temp.length % 25 === 0) {
        res.push(temp)
        temp = [v]
      } else {
        temp.push(v)
      }
    })
    if(temp.length > 0) res.push(temp)

    return res;
  }
  const [data, set_data] = useState<Array<ICertified_company_summary>>(get_certified_companies_summary(search))
  useEffect(() => {
    set_data(get_certified_companies_summary(search));
  }, [search]);

  const [is_open_modal, set_is_open_modal] = useState<boolean>(false);
  const [modal_data, set_modal_data] = useState<ICertified_company | null>(null)

  return (
    <Section>
      <Col gap={24} width={'fill'} className={style.swiper_button}>
        <Row>
          <Typo.Body emphasize color={'variable'}>{`${data.length}개`}</Typo.Body>
          <Typo.Body color={'variable'}>의 업체</Typo.Body>
        </Row>
        <SwiperPaginationAndNavigation>
          {parse_certified_company_summary_data(data).map((array_v, i) => (
            <SwiperSlide key={i}>
              <div className={style.grid}>
                {array_v.map((v, j) => (
                  <Certified_company_card
                    key={`company_card-${j}`}
                    {...v}
                    onClick={() => {
                      set_modal_data(get_certified_company_by_id(v.id))
                      set_is_open_modal(true)
                    }}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </SwiperPaginationAndNavigation>
        <Certified_company_modal
          is_open_modal={is_open_modal}
          set_is_open_modal={set_is_open_modal}
          data={modal_data}
        />
      </Col>
    </Section>
  )
}
