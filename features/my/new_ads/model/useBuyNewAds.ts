import {useAdsPublicControllerCreate} from '@/entities/api/advertisement-public/advertisement-public'
import {CreateAdvertisementDto} from '@/entities/const'
import {
  IBanner_req, ILine_req,
  ILocation_banner_req,
  IPremium_banner_req, IProduct_banner_req,
  ISponsor_link_req,
  ITop_banner_req,
  TAds_name,
  TAll_req, TLocation
} from '@/shared/type'

export default function useBuyNewAds(
  parentData: {
    depositor: string,
    totalPrice: number,
  },
  adData: Array<{
    name: TAds_name,
    req_data: TAll_req
  }>,
  selectedAds: Set<TAds_name>
) {
  const mutation = useAdsPublicControllerCreate()

  const addAds = () => {
    const notIncludeReqAd: Array<TAds_name> = []
    adData.forEach((ad) => {
      if(selectedAds.has(ad.name))
        selectedAds.delete(ad.name)
    })
    selectedAds.forEach((ad) => {
      notIncludeReqAd.push(ad)
    })

    mutation.mutate({
      data: [
        ...rawDataParseToCreateAdvertisementDto(parentData, adData),
        ...notIncludeReqAd.map(v => {
          const res: CreateAdvertisementDto = {
            ad_name: v,
            deposit_name: parentData.depositor
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

const adsNameToInterfaceMap = {
  '프리미엄 배너광고': {} as IPremium_banner_req,
  '메인 베너광고': {} as IBanner_req,
  '메인 TOP 배너광고': {} as ITop_banner_req,
  '스폰서 링크': {} as ISponsor_link_req,
  '지역 배너광고': {} as ILocation_banner_req,
  '상품 배너 광고': {} as IProduct_banner_req,
  '실시간 대출문의 업체 등록': undefined,
  '줄광고': {} as ILine_req,
  '줄광고 점프 추가 사용': undefined
}

function rawDataParseToCreateAdvertisementDto(
  parentData: {
    depositor: string,
    totalPrice: number,
  },
  adData: Array<{
    name: TAds_name,
    req_data: TAll_req
  }>
): Array<CreateAdvertisementDto> {
  const res: Array<CreateAdvertisementDto> = []
  adData.forEach((v) => {
    const loan_limit = 'loan_limit' in v.req_data ? Number(v.req_data.loan_limit.replaceAll(',', '')) : undefined
    const available_location = 'available_location' in v.req_data ? [v.req_data.available_location as TLocation] : undefined
    res.push({
      deposit_name: parentData.depositor,
      ad_name: v.name,
      ...v.req_data,
      loan_limit: loan_limit,
      loan_available_location: available_location,
    })
  })
  return res
}

interface typeByAdName {
  '프리미엄 배너광고': IPremium_banner_req
  '메인 베너광고': IBanner_req
  '메인 TOP 배너광고': ITop_banner_req
  '스폰서 링크': ISponsor_link_req
  '지역 배너광고': ILocation_banner_req
  '상품 배너 광고': IProduct_banner_req
  '실시간 대출문의 업체 등록': undefined
  '줄광고': ILine_req
  '줄광고 점프 추가 사용': undefined
}

function getReqKeys<T extends Object>(v: T): Array<keyof T> {
  return Object.keys(v) as Array<keyof T>
}

function adTypeGuard(
  name: TAds_name,
  req_data: TAll_req
) {
  switch(name) {
    case "프리미엄 배너광고":
      return guard<typeByAdName["프리미엄 배너광고"]>(
        getReqKeys<typeByAdName["프리미엄 배너광고"]>(adsNameToInterfaceMap["프리미엄 배너광고"]),
        req_data
      )
    case "메인 베너광고":
      return guard<typeByAdName["메인 베너광고"]>(
        getReqKeys<typeByAdName["메인 베너광고"]>(adsNameToInterfaceMap["메인 베너광고"]),
        req_data
      )
    case "메인 TOP 배너광고":
      return guard<typeByAdName["메인 TOP 배너광고"]>(
        getReqKeys<typeByAdName["메인 TOP 배너광고"]>(adsNameToInterfaceMap["메인 TOP 배너광고"]),
        req_data
      )
    case "상품 배너 광고":
      return guard<typeByAdName["상품 배너 광고"]>(
        getReqKeys<typeByAdName["상품 배너 광고"]>(adsNameToInterfaceMap["상품 배너 광고"]),
        req_data
      )
    case "지역 배너광고":
      return guard<typeByAdName["지역 배너광고"]>(
        getReqKeys<typeByAdName["지역 배너광고"]>(adsNameToInterfaceMap["지역 배너광고"]),
        req_data
      )
    case "줄광고":
      return guard<typeByAdName["줄광고"]>(
        getReqKeys<typeByAdName["줄광고"]>(adsNameToInterfaceMap["줄광고"]),
        req_data
      )
    case "스폰서 링크":
      return guard<typeByAdName["스폰서 링크"]>(
        getReqKeys<typeByAdName["스폰서 링크"]>(adsNameToInterfaceMap["스폰서 링크"]),
        req_data
      )
    default:
      return true
  }
}

function guard
<T extends Object>
(
  reqKeys: Array<(keyof T)>,
  data: unknown
): data is T {
  if (typeof data !== 'object' || data === null) return false;
  let type = true
  for(const key of reqKeys) {
    type = type && key in data
  }
  return type
}