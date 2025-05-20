import {Col} from "@/components/atoms/layout";
import Typo from "@/components/atoms/typo/Typo";
import {DataProvider, Table} from "@/components/organisms";
import style from '../style.module.scss'
import {ConsumableAdsTableHead, ConsumableAdsTableRow} from "@/features/my/ads/ui/ad_contents/ConsumableAdsTable";
import {userControllerGetUser, useUserControllerGetUser, useUserControllerProfile} from "@/entities/api/user/user";
import {useEffect, useState} from "react";
import {getWaitUntilPromiseFromEvent} from "next/dist/server/web/spec-extension/fetch-event";
import {adsPublicControllerJump} from "@/entities/api/advertisement-public/advertisement-public";
import {AxiosError} from "axios";

export default function ConsumableAds() {
  const {
    data: profileData,
    status: profileStatus,
  } = useUserControllerProfile()

  const [data, setData] = useState<{jump: number, upload: number} | undefined>()
  const [status, setStatus] = useState<'success' | 'error' | 'pending'>('pending')
  const [refetcher, setRefetcher] = useState<boolean>(true)

  const refetch = () => {
    setRefetcher(p => !p)
  }

  useEffect(() => {
    if(profileStatus !== 'success' && profileData === undefined) {
      setStatus(profileStatus)
      return
    }
    const getUserData = async () => {
      try {
        const res = await userControllerGetUser(profileData.id)
        setData({
          jump: res?.remainScrollAdJumpCount ?? 0,
          upload: res?.remainRealTimeLoanInquiryCompanyRegistration ?? 0
        })
      } catch(e) {
        console.error(e)
        setStatus('error')
      }
    }

    getUserData()
  }, [profileStatus, refetcher])

  return (
    <Col width={'fill'} gap={16}>
      <Typo.Body color={'variable'} emphasize>
        소모형 광고
      </Typo.Body>
      <Col width={'fill'} gap={4}>
        <Table
          className={style.table}
          head={<ConsumableAdsTableHead/>}
        >
          {data && (
            <>
              <ConsumableAdsTableRow
                name={'줄광고 점프'}
                remain={data.jump}
                useFunc={() => {
                  if(data.jump > 0) {
                    adsPublicControllerJump()
                      .then(() => {
                        alert('사용됐습니다')
                        refetch()
                      })
                      .catch(e => {
                        if(e instanceof AxiosError) {
                          if(e.response?.data?.message === '줄광고 점프 횟수를 초과했습니다.') {
                            alert('줄광고 점프를 전부 사용했어요, 추가로 구매해주세요')
                            return
                          }
                        }
                      })
                  } else {
                    alert('줄광고 점프를 전부 사용했어요, 추가로 구매해주세요')
                  }
                }}
              />
              <ConsumableAdsTableRow name={'대출 가능 업체 등록'} remain={data.upload}/>
            </>
          )}
        </Table>
      </Col>
    </Col>
  )
}

