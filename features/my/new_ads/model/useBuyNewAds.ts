import {useAdsPublicControllerCreate} from '@/entities/api/advertisement-public/advertisement-public'
import {CreateAdvertisementDto} from '@/entities/const'
import {rawTAll_reqDataParseToCreateAdvertisementDto} from '@/shared/helper'
import {
  TAds_name,
  TAll_req
} from '@/shared/type'

export default function useBuyNewAds() {
  const mutation = useAdsPublicControllerCreate()

  const addAds = async (
    parentData: {
      depositor: string,
      totalPrice: number,
    },
    adData: Array<{
      name: TAds_name,
      req_data: TAll_req,
      price: number
    }>,
    selectedAds: Set<{
      name: TAds_name,
      price: number
    }>
  ) => {
    const notIncludeReqAd: Array<{ name: TAds_name; price: number }> = []

    const adNamesInData = new Set(adData.map(ad => ad.name))

    selectedAds.forEach((ad) => {
      if (!adNamesInData.has(ad.name)) {
        notIncludeReqAd.push({ name: ad.name, price: ad.price })
      }
    })


    const parsedData = await rawTAll_reqDataParseToCreateAdvertisementDto(parentData, adData)
    mutation.mutate({
      data: [
        ...parsedData,
        ...notIncludeReqAd.map(v => {
          const res: CreateAdvertisementDto = {
            ad_name: v.name,
            deposit_name: parentData.depositor,
            deposit_fee: v.price,
          }
          return res
        })
      ]
    })
  }

  return {
    status: mutation.status,
    addAds,
  }
}
