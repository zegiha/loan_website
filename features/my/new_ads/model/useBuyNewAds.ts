import {useAdsPublicControllerCreate} from '@/entities/api/advertisement-public/advertisement-public'
import {CreateAdvertisementDto} from '@/entities/const'
import {
  IBanner_req, ILine_req,
  ILocation_banner_req,
  IPremium_banner_req, IProduct_banner_req,
  ISponsor_link_req,
  ITop_banner_req,
  TAds_name,
  TAll_req
} from '@/shared/type'
import {uploadControllerUploadFile} from "@/entities/api/upload/upload";

export default function useBuyNewAds(
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
) {
  const mutation = useAdsPublicControllerCreate()

  const addAds = async () => {
    const notIncludeReqAd: Array<{ name: TAds_name; price: number }> = []

    const adNamesInData = new Set(adData.map(ad => ad.name))

    selectedAds.forEach((ad) => {
      if (!adNamesInData.has(ad.name)) {
        notIncludeReqAd.push({ name: ad.name, price: ad.price })
      }
    })


    const parsedData = await rawDataParseToCreateAdvertisementDto(parentData, adData)
    mutation.mutate({
      data: [
        ...parsedData,
        ...notIncludeReqAd.map(v => {
          const res: CreateAdvertisementDto = {
            ad_name: v.name,
            deposit_name: parentData.depositor,
            deposit_fee: v.price
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

// 각 광고 유형별 인터페이스 정의 매핑
const adsNameToInterfaceMap = {
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

interface typeByAdName {
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

async function rawDataParseToCreateAdvertisementDto(
  parentData: {
    depositor: string,
    totalPrice: number,
  },
  adData: Array<{
    name: TAds_name,
    req_data: TAll_req,
    price: number
  }>
): Promise<Array<CreateAdvertisementDto>> {
  const res: Array<CreateAdvertisementDto> = []

  for(let i = 0; i < adData.length; i++) {

    const v = adData[i]
    const adName = v.name; // 광고의 실제 이름을 사용
    const reqData = v.req_data
    const defaultValue = {
      deposit_fee: v.price,
      deposit_name: parentData.depositor,
    }

    // 광고 이름에 따라 적절한 처리를 수행
    switch(adName) {
      case '프리미엄 배너광고':
        if(guard<typeByAdName["프리미엄 배너광고"]>(
          getReqKeys<typeByAdName["프리미엄 배너광고"]>(adsNameToInterfaceMap["프리미엄 배너광고"]),
          reqData
        )) {
          res.push({
            ...defaultValue,
            ad_name: '프리미엄 배너광고',
            loan_available_location: [reqData.location ?? '전체'],
            title: reqData.title,
          });
        }
        break;
      case "메인 배너광고":
        if(guard<typeByAdName["메인 배너광고"]>(
          getReqKeys<typeByAdName["메인 배너광고"]>(adsNameToInterfaceMap["메인 배너광고"]),
          reqData
        )) {
          const imageUrl = await getImg(reqData.banner_cover_img);
          res.push({
            ...defaultValue,
            ad_name: '메인 배너광고',
            title: reqData.title,
            sub_title: reqData.subtitle,
            image_url: imageUrl,
            loan_available_location: [reqData.loan_available_location ?? '전체'],
          });
        }
        break;

      case '메인 TOP 배너광고':
        if(guard<typeByAdName["메인 TOP 배너광고"]>(
          getReqKeys<typeByAdName["메인 TOP 배너광고"]>(adsNameToInterfaceMap['메인 TOP 배너광고']),
          reqData
        )) {
          const img = await getImg(reqData.banner_cover_img);
          res.push({
            ...defaultValue,
            ad_name: '메인 TOP 배너광고',
            title: reqData.title,
            contents: reqData.contents,
            image_url: img,
          });
        }
        break;

      case '스폰서 링크':
        if(guard<typeByAdName["스폰서 링크"]>(
          getReqKeys<typeByAdName["스폰서 링크"]>(adsNameToInterfaceMap["스폰서 링크"]),
          reqData
        )) {
          res.push({
            ...defaultValue,
            ad_name: '스폰서 링크',
            contents: reqData.contents,
          });
        }
        break;

      case '지역 배너광고':
        if(guard<typeByAdName["지역 배너광고"]>(
          getReqKeys<typeByAdName["지역 배너광고"]>(adsNameToInterfaceMap["지역 배너광고"]),
          reqData
        )) {
          const imageUrl = await getImg(reqData.banner_cover_img);
          res.push({
            ...defaultValue,
            ad_name: '지역 배너광고',
            title: reqData.title,
            sub_title: reqData.subtitle,
            image_url: imageUrl,
            loan_available_location: reqData.location ?? ['전체'],
          });
        }
        break;

      case '상품 배너 광고':
        if(guard<typeByAdName["상품 배너 광고"]>(
          getReqKeys<typeByAdName["상품 배너 광고"]>(adsNameToInterfaceMap["상품 배너 광고"]),
          reqData
        )) {
          const imageUrl = await getImg(reqData.banner_cover_img);
          res.push({
            ...defaultValue,
            ad_name: '상품 배너 광고',
            title: reqData.title,
            sub_title: reqData.subtitle,
            image_url: imageUrl,
            product_type: reqData.product ?? ['전체'],
            loan_available_location: [reqData.loan_available_location ?? '전체'],
          });
        }
        break;

      case '줄광고':
        if(guard<typeByAdName["줄광고"]>(
          getReqKeys<typeByAdName["줄광고"]>(adsNameToInterfaceMap["줄광고"]),
          reqData
        )) {
          res.push({
            ...defaultValue,
            ad_name: '줄광고',
            title: reqData.title,
            loan_limit: Number(reqData.loan_limit.replaceAll(',', '')) ?? 0,
          });
        }
        break;
    }
  }
  return res;
}

async function getImg(reqData: File | undefined) {
  let img = undefined;
  if(reqData !== undefined)
    img = await uploadControllerUploadFile({file: reqData}).then(res => {
      if(res) return res.url;
      return undefined;
    });
  return img;
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
