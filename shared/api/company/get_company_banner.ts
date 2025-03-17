'use server'

import get_temp_image from "@/shared/api/get_temp_image";
import {ICompany_banner_data} from "@/shared/type";

type page_option_type = 'home' | 'location' | 'product';

function get_fetch_url(page_option: page_option_type): string {
  switch(page_option) {
    case "home": return "home_option_url"
    case "location": return "location_option_url"
    case "product": return "product_option_url"
  }
}

const dummy: ICompany_banner_data = {
  id: 'id',
  title: "무방문 무서류 당일 대출",
  subtitle: "지역 시간 장소 제약 X 월별 당일승인 당일송금",
  name: "스피드 대출",
  phone: "010-4612-4593",
  location: "전국",
  img_url: get_temp_image()
}

export default async function get_company_banner(
  page_option: page_option_type,
  data_number: number | undefined = 20
): Promise<Array<ICompany_banner_data>> {
  const fetch_url = get_fetch_url(page_option);

  let dummies: Array<ICompany_banner_data> = [];
  for(let i = 0; i < data_number; i++) dummies.push(dummy);

  return dummies;
}
