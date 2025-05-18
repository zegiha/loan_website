import {
  IBanner_req, ILine_req,
  ILocation_banner_req,
  IPremium_banner_req, IProduct_banner_req,
  ISponsor_link_req,
  ITop_banner_req, TAds_name
} from "@/shared/type";

export const adsNameToInterfaceMap = {
  '프리미엄 배너광고': { location: undefined, title: '' } as IPremium_banner_req,
  '메인 배너광고': { title: '', subtitle: '', banner_cover_img: undefined, loan_available_location: undefined, loan_limit: '' } as IBanner_req,
  '메인 TOP 배너광고': { title: '', contents: '', banner_cover_img: undefined, loan_limit: '' } as ITop_banner_req,
  '스폰서 링크': { contents: '' } as ISponsor_link_req,
  '지역 배너광고': { title: '', subtitle: '', phone: '', location: [], banner_cover_img: undefined, loan_limit: '' } as ILocation_banner_req,
  '상품 배너 광고': { title: '', subtitle: '', phone: '', product: [], banner_cover_img: undefined, loan_available_location: undefined, loan_limit: '' } as IProduct_banner_req,
  '실시간 대출문의 업체 등록': undefined,
  '줄광고': { title: '', loan_limit: '' } as ILine_req,
  '줄광고 점프 추가 사용': undefined
}

export interface typeByAdName {
  '프리미엄 배너광고': IPremium_banner_req
  '메인 배너광고': IBanner_req
  '메인 TOP 배너광고': ITop_banner_req
  '스폰서 링크': ISponsor_link_req
  '지역 배너광고': ILocation_banner_req
  '상품 배너 광고': IProduct_banner_req
  '실시간 대출문의 업체 등록': undefined
  '줄광고': ILine_req
  '줄광고 점프 추가 사용': undefined
}

function getReqKeys<T extends Object>(v: T): Array<keyof T> {
  return Object.keys(v) as Array<keyof T>;
}

function guard<T extends Object>(
  reqKeys: Array<(keyof T)>,
  data: unknown
): data is T {
  if (typeof data !== 'object' || data === null) return false;
  let type = true;
  for(const key of reqKeys) {
    type = type && key in data;
  }
  return type;
}

export default function adTypeGuard(adName: TAds_name, data: unknown) {
  const adInterface = adsNameToInterfaceMap[adName]

  if(adInterface === undefined)
    return adName === '줄광고 점프 추가 사용' ||
      adName === '실시간 대출문의 업체 등록'

  return guard<typeof adInterface>(
    getReqKeys<typeof adInterface>(adInterface),
    data
  )
}
