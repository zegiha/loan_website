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

const dummy1: ICompany_banner_data = {
  id: 'id',
  title: "어디든 언제든 당일 대출",
  subtitle: "당일 대출",
  name: "대출",
  phone: "010-1234-5678",
  location: "전국",
  img_url: get_temp_image(1224)
}
const dummy2: ICompany_banner_data = {
  id: 'id',
  title: "무방문 무서류 빠른 대출",
  subtitle: "빠른 대출",
  name: "대출",
  phone: "010-1234-5678",
  location: "서울",
  img_url: get_temp_image(16834893)
}
const dummy3: ICompany_banner_data = {
  id: 'id',
  title: "여성만을 위한 여성 대출",
  subtitle: "여성 대출",
  name: "대출",
  phone: "010-1234-5678",
  location: "경기",
  img_url: get_temp_image(240518)
}
const dummy4: ICompany_banner_data = {
  id: 'id',
  title: "직장인이면 누구나 대출 가능",
  subtitle: "직장인 대출",
  name: "대출",
  phone: "010-1234-5678",
  location: "인천",
  img_url: get_temp_image(30469)
}
const dummy5: ICompany_banner_data = {
  id: 'id',
  title: "어느 곳 보다 간편하게 대출",
  subtitle: "간편 대출",
  name: "대출",
  phone: "010-1234-5678",
  location: "전북",
  img_url: get_temp_image(913340588)
}

export default async function get_company_banner(
  page_option: page_option_type,
  data_number: number | undefined = 20
): Promise<Array<ICompany_banner_data>> {
  const fetch_url = get_fetch_url(page_option);

  let dummies: Array<ICompany_banner_data> = [];
  for(let i = 0; i < data_number / 5; i++) {
    dummies.push(dummy1)
    dummies.push(dummy2)
    dummies.push(dummy3)
    dummies.push(dummy4)
    dummies.push(dummy5)
  }


  return dummies;
}
