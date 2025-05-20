'use client'

import {useAdsPublicControllerRequestUpdate} from '@/entities/api/advertisement-public/advertisement-public'
import {uploadControllerUploadFile} from '@/entities/api/upload/upload'
import {AdResponseDto, UpdateAdvertisementDto} from '@/entities/const'
import {adsNameToInterfaceMap, getReqKeys, guard, typeByAdName} from '@/shared/constants'
import {TAds_name, TAll_req} from '@/shared/type'

export default function useEditing(id: string) {
  const mutation = useAdsPublicControllerRequestUpdate()

  const handleEdit = async (prevData: AdResponseDto, newData: TAll_req) => {
    const data = await getUpdateAdvertisementDto(
      prevData.ad_name,
      newData
    ).then(res => {
      console.log(res)
      const mergeWithPrev: UpdateAdvertisementDto = {
        title: prevData?.title,
        sub_title: prevData?.sub_title,
        contents: prevData?.contents,
        image_url: prevData?.image_url,
        cover_img: prevData?.cover_img,
        loan_available_location: prevData?.loan_available_location,
        loan_limit: prevData?.loan_limit,
        product_type: prevData?.product_type,
        ...res,
      }
      return mergeWithPrev
    })
    mutation.mutate({
      id,
      data: data
    })
  }

  return {
    ...mutation,
    handleEdit
  }
}

async function getUpdateAdvertisementDto(
  adName: TAds_name,
  reqData: TAll_req
): Promise<UpdateAdvertisementDto> {
  const res: Array<UpdateAdvertisementDto> = []

  switch(adName) {
    case '프리미엄 배너광고':
      if(guard<typeByAdName["프리미엄 배너광고"]>(
        getReqKeys<typeByAdName["프리미엄 배너광고"]>(adsNameToInterfaceMap["프리미엄 배너광고"]),
        reqData
      )) {
        res.push({
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
          title: reqData.title,
          loan_limit: Number(reqData.loan_limit.replaceAll(',', '')) ?? 0,
        });
      }
      break;
  }
  return res[0]
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