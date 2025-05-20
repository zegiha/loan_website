import {Col, Row} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {DataProvider, Table} from "@/components/organisms";
import Modal from "@/components/molecules/modal/Modal";
import Edit_ad from "@/features/my/ads/ui/edit_ad/Edit_ad";
import Prolongation_ad from "@/features/my/ads/ui/prolongation_ad/Prolongation_ad";
import {My_ads_table_head, My_ads_table_row} from "@/features/my/ads/ui/ad_contents/My_ads_table";
import {ReactNode, useState} from "react";
import {useAdsPublicControllerFindAllofMyAds} from "@/entities/api/advertisement-public/advertisement-public";
import {IMy_ads} from "@/features/my/ads/ui/ad_contents/Ad_contents";
import {BaseButton} from "@/components/molecules/inputs";
import {CloseIcon} from "@/components/atoms/icons";
import style from '../style.module.scss'

export default function CommonAds() {
  const [is_edit_open, set_is_edit_open] = useState(false);
  const [is_prolongation_open, set_is_prolongation_open] = useState(false);
  const [ad_info, set_ad_info] = useState<string | null>(null)

  const {
    data,
    status,
  } = useAdsPublicControllerFindAllofMyAds({
    query: {
      select: v => {
        const res: Array<IMy_ads> = []
        v.forEach(v => {
          res.push({
            id: v.id,
            ad_name: v.ad_name,
            title: v.title ?? '',
            end_date: new Date(v.ad_present_expire_date ?? '')
          })
        })
        return res
      }
    }
  })
  return (
    <>
      <Col width={'fill'} gap={16}>
        <Typo.Body color={'variable'} emphasize>
          나의 광고
        </Typo.Body>
        <Col width={'fill'} gap={4}>
          <Table
            className={style.table}
            head={<My_ads_table_head/>}
          >
            <DataProvider
              available={{
                isAvailable: status === 'success' && data?.length > 0,
                notAvailableContents: '아직 등록된 광고가 없어요'
              }}
            >
              {status === 'success' && (
                data.map((v, i) => (
                  <My_ads_table_row
                    key={i}
                    {...v}
                    option={v.ad_name === '줄광고' ?
                      {off_edit: false, off_prolongation: true}:
                      v.ad_name === '실시간 대출문의 업체 등록' || v.ad_name === '줄광고 점프 추가 사용' ?
                        {off_edit: true, off_prolongation: true}:
                        {off_edit: false, off_prolongation: false}
                    }
                    edit_action={() => {
                      set_ad_info(v.id)
                      set_is_edit_open(true)
                    }}
                    prolongation_action={() => {
                      set_ad_info(v.id)
                      set_is_prolongation_open(true)
                    }}
                  />
                ))
              )}
            </DataProvider>
          </Table>
        </Col>
      </Col>
      <Modal isOpen={is_edit_open} setIsOpen={set_is_edit_open}>
        <Modal_wrapper close_func={() => set_is_edit_open(false)}>
          {ad_info !== null && (
            <Edit_ad
              id={ad_info}
            />
          )}
        </Modal_wrapper>
      </Modal>
      <Modal isOpen={is_prolongation_open} setIsOpen={set_is_prolongation_open}>
        <Modal_wrapper close_func={() => set_is_prolongation_open(false)}>
          {ad_info !== null && (
            <Prolongation_ad
              id={ad_info}
              close_func={() => set_is_prolongation_open(false)}
            />
          )}
        </Modal_wrapper>
      </Modal>
    </>
  )
}

function Modal_wrapper({
                         children,
                         close_func
                       }:{
  children: ReactNode
  close_func: () => void
}) {
  return (
    <div
      className={style.modal_wrapper}
      onClick={e => e.stopPropagation()}
    >
      <Col className={style.container}>
        <Col className={style.wrapper}>
          <Row width={'fill'} justifyContents={'end'}>
            <BaseButton className={style.close_button} onClick={close_func}>
              <CloseIcon size={24} color={'dim'} />
            </BaseButton>
          </Row>
          {children}
        </Col>
      </Col>
    </div>
  )
}
