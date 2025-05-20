import {uploadControllerUploadFile} from '@/entities/api/upload/upload'
import {CreateAdvertisementDto} from '@/entities/const'
import {adsNameToInterfaceMap, getReqKeys, guard, typeByAdName} from '@/shared/constants'
import {TAds_name, TAll_req} from '@/shared/type'

export default async function rawTAll_reqDataParseToCreateAdvertisementDto(
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
            loan_available_location: reqData.location ?? ['전체'],
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
            loan_available_location: reqData.loan_available_location ?? ['전체'],
            loan_limit: Number(reqData.loan_limit.replaceAll(',', ''))
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
            loan_limit: Number(reqData.loan_limit.replaceAll(',', ''))
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
            loan_limit: Number(reqData.loan_limit.replaceAll(',', ''))
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
            loan_available_location: reqData.loan_available_location ?? ['전체'],
            loan_limit: Number(reqData.loan_limit.replaceAll(',', ''))
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